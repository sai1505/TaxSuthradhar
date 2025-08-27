const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../middleware/authMiddleware');
const { s3, R2_BUCKET_NAME } = require('../utils/r2-client');
const { GetObjectCommand, PutObjectCommand } = require('@aws-sdk/client-s3');

// ... (genAI setup is the same) ...
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);


// --- R2 Helper Functions for INDIVIDUAL CHATS (No changes here) ---

const getChatFromR2 = async (email, chatId) => {
    const key = `chats/${email}/${chatId}.json`;
    const command = new GetObjectCommand({ Bucket: R2_BUCKET_NAME, Key: key });

    try {
        const response = await s3.send(command);
        const body = await response.Body.transformToString();
        return JSON.parse(body);
    } catch (error) {
        console.error(`Error fetching chat ${chatId} for ${email}:`, error);
        throw new Error('Chat session not found.');
    }
};

const saveChatToR2 = async (email, chatId, data) => {
    const key = `chats/${email}/${chatId}.json`;
    const command = new PutObjectCommand({
        Bucket: R2_BUCKET_NAME,
        Key: key,
        Body: JSON.stringify(data, null, 2),
        ContentType: 'application/json',
    });
    await s3.send(command);
};


// --- Updated Chat Route for Session Management ---

router.post('/chat', authenticateToken, async (req, res) => {
    // MODIFIED: Now accepts a 'file' object alongside prompt and chatId
    const { prompt, chatId, file } = req.body;
    const userEmail = req.user.email;

    if (!prompt) return res.status(400).json({ message: 'Prompt is required.' });

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // MODIFIED: Build a dynamic prompt that can include a file
        const requestParts = [prompt]; // Start with the text prompt

        // If a file is attached to the chat session, add it to the request
        if (file && file.fileId) {
            console.log(`Including file ${file.fileId} in the prompt.`);
            requestParts.push({
                fileData: {
                    // This uses the unique 'name' provided by the Google AI File API
                    fileName: file.fileId,
                }
            });
        }

        // 1. Get AI response using the potentially multimodal request
        const result = await model.generateContent(requestParts);
        const aiResponseText = result.response.text();

        // The rest of the logic for saving the conversation remains the same
        let currentChatId = chatId;
        let chatData;

        // 2. Determine if this is a new chat or an existing one
        if (!currentChatId) {
            // This is a NEW chat
            currentChatId = `chat-${Date.now()}`;
            chatData = {
                id: currentChatId,
                title: prompt.substring(0, 40),
                createdAt: new Date().toISOString(),
                messages: [],
            };
        } else {
            // This is an EXISTING chat
            chatData = await getChatFromR2(userEmail, currentChatId);
        }

        // 3. Add the new messages to the session
        chatData.messages.push({ sender: 'user', text: prompt });
        chatData.messages.push({ sender: 'ai', text: aiResponseText });

        // 4. Save the updated session back to its file in R2
        await saveChatToR2(userEmail, currentChatId, chatData);

        // 5. Respond with the AI text AND the chatId
        res.status(200).json({
            response: aiResponseText,
            chatId: currentChatId,
        });

    } catch (error) {
        console.error('❌ API error:', error.message);
        res.status(500).json({
            message: 'Error in chat session.',
            error: error.message
        });
    }
});

module.exports = router;