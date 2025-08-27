// routes/analyzeRoutes.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../middleware/authMiddleware');

// NEW: Import the S3 client for R2 and the PutObjectCommand
const { s3, R2_BUCKET_NAME } = require('../utils/r2-client');
const { PutObjectCommand } = require('@aws-sdk/client-s3');


const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);

// Configure multer (no changes here)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// fileToGenerativePart function (no changes here)
function fileToGenerativePart(buffer, mimeType) {
    return {
        inlineData: {
            data: buffer.toString("base64"),
            mimeType
        },
    };
}


// MODIFIED: The endpoint now saves to R2 and analyzes concurrently
router.post('/analyze', authenticateToken, upload.single('document'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No document was uploaded.' });
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const userEmail = req.user.email; // Get user's email for organizing files

        // --- Task 1: Prepare the R2 Upload ---

        // Create a unique filename to prevent overwrites
        const fileName = `documents/${userEmail}/${Date.now()}-${req.file.originalname}`;

        const r2UploadCommand = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: fileName,
            Body: req.file.buffer, // The file data from the upload
            ContentType: req.file.mimetype, // The file's type (e.g., 'application/pdf')
        });

        // --- Task 2: Prepare the AI Analysis ---

        const prompt = "Please analyze this document in detail. Summarize its key points, identify any important figures or data, and explain its main purpose.";
        const filePart = fileToGenerativePart(req.file.buffer, req.file.mimetype);
        const requestParts = [prompt, filePart];

        // --- Execute both tasks in parallel for efficiency ---

        console.log(`Uploading ${fileName} to R2 and sending to Gemini...`);

        // Promise.all runs both the R2 upload and the AI analysis at the same time
        const [r2Result, analysisResult] = await Promise.all([
            s3.send(r2UploadCommand),
            model.generateContent(requestParts)
        ]);

        console.log('File successfully uploaded to R2.');

        const response = await analysisResult.response;
        const analysisText = response.text();

        res.status(200).json({ analysis: analysisText });

    } catch (error) {
        console.error('Error during file processing:', error);
        res.status(500).json({ message: 'Error processing document.', error: error.message });
    }
});

module.exports = router;