const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { readUsers, writeUsers } = require('../db/database');
const authenticateToken = require('../middleware/authMiddleware');

// Validate GOOGLE_API_KEY at startup
if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ GOOGLE_API_KEY is missing from .env file.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

router.post('/chat', authenticateToken, async (req, res) => {
    const { prompt } = req.body;
    const userEmail = req.user.email;

    if (!prompt) {
        return res.status(400).json({ message: 'Prompt is required.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const aiResponseText = response.text();

        // Save chat history
        const users = readUsers();
        const user = users.find(u => u.email === userEmail);
        if (user) {
            user.chats.push({
                id: `chat-${Date.now()}`,
                title: prompt.substring(0, 30),
                messages: [
                    { sender: 'user', text: prompt },
                    { sender: 'ai', text: aiResponseText }
                ]
            });
            writeUsers(users);
        }

        res.status(200).json({ response: aiResponseText });

    } catch (error) {
        console.error('❌ Gemini API error:', {
            message: error.message,
            stack: error.stack,
            details: error.response ? await error.response.text() : null
        });
        res.status(500).json({
            message: 'Error communicating with the AI.',
            error: error.message
        });
    }
});

module.exports = router;
