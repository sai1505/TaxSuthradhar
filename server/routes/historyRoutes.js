// routes/historyRoutes.js

const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { s3, R2_BUCKET_NAME } = require('../utils/r2-client');
const { ListObjectsV2Command, GetObjectCommand } = require('@aws-sdk/client-s3');

// GET /api/chats - Fetches a list of chat summaries for the user
router.get('/chats', authenticateToken, async (req, res) => {
    const userEmail = req.user.email;
    const prefix = `chats/${userEmail}/`; // The "folder" for the user's chats

    try {
        // 1. List all chat files in the user's folder in R2
        const listCommand = new ListObjectsV2Command({
            Bucket: R2_BUCKET_NAME,
            Prefix: prefix,
        });
        const listResponse = await s3.send(listCommand);

        if (!listResponse.Contents || listResponse.Contents.length === 0) {
            return res.json([]); // No chats found, return empty array
        }

        // 2. Fetch the content of each chat file to get its metadata
        const chatSummaries = await Promise.all(
            listResponse.Contents.map(async (obj) => {
                const getCommand = new GetObjectCommand({
                    Bucket: R2_BUCKET_NAME,
                    Key: obj.Key,
                });
                const itemResponse = await s3.send(getCommand);
                const content = await itemResponse.Body.transformToString();
                const chatData = JSON.parse(content);

                // Return just the summary, not the whole message history
                return {
                    id: chatData.id,
                    title: chatData.title,
                    createdAt: chatData.createdAt,
                };
            })
        );

        // 3. Sort by creation date, newest first
        chatSummaries.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        res.status(200).json(chatSummaries);

    } catch (error) {
        console.error('Error fetching chat history:', error);
        res.status(500).json({ message: 'Failed to retrieve chat history.' });
    }
});

// GET /api/chat/:chatId - Fetches the FULL content of a single chat
router.get('/chat/:chatId', authenticateToken, async (req, res) => {
    const userEmail = req.user.email;
    const { chatId } = req.params;
    const key = `chats/${userEmail}/${chatId}.json`;

    try {
        const command = new GetObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: key,
        });
        const response = await s3.send(command);
        const content = await response.Body.transformToString();
        const chatData = JSON.parse(content);
        res.status(200).json(chatData);
    } catch (error) {
        console.error(`Error fetching chat ${chatId}:`, error);
        res.status(404).json({ message: 'Chat session not found.' });
    }
});


module.exports = router;