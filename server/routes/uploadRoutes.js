const express = require('express');
const router = express.Router();
const multer = require('multer');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const authenticateToken = require('../middleware/authMiddleware');

if (!process.env.GOOGLE_API_KEY) {
    console.error('❌ FATAL ERROR: GOOGLE_API_KEY is not defined in your .env file.');
    process.exit(1);
}

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MODIFIED: The upload endpoint now responds immediately.
// POST /api/upload - Initiates the file upload to Google AI
router.post('/upload', authenticateToken, upload.single('document'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ message: 'No document was uploaded.' });
    }

    try {
        console.log(`Uploading file to Google AI: ${req.file.originalname}`);

        // MODIFIED: Corrected method name to 'uploadFile'
        const result = await genAI.files.upload({
            file: {
                contents: req.file.buffer,
                mimeType: req.file.mimetype,
            },
            displayName: req.file.originalname,
        });

        // MODIFIED: The file metadata is nested inside the 'file' property of the result.
        const file = result.file;
        console.log(`File upload initiated successfully. File ID: ${file.name}`);

        // MODIFIED: Respond immediately with the file ID and an initial status.
        // The client should now poll the new status endpoint.
        res.status(202).json({ // 202 Accepted indicates the request is being processed.
            message: "File upload initiated. The file is now being processed.",
            fileId: file.name, // e.g., "files/sjn1kemb2ext"
            fileName: file.displayName,
            initialStatus: file.state // Should be "PROCESSING"
        });

    } catch (error) {
        console.error('An error occurred during file upload initiation.', error);
        res.status(500).json({
            message: 'Error initiating file upload to Google AI.',
            errorDetails: error.message
        });
    }
});

// Completely remove the old route and replace with this:
router.get('/files/status/:fileId(*)', authenticateToken, async (req, res) => {
    const fileId = req.params.fileId;
    if (!fileId) {
        return res.status(400).json({ message: 'File ID is required.' });
    }

    try {
        console.log(`Checking status for file: ${fileId}`);
        const file = await genAI.files.getFile(fileId);

        res.status(200).json({
            fileId: file.name,
            fileName: file.displayName,
            status: file.state,
        });

    } catch (error) {
        console.error(`Error getting status for file ${fileId}:`, error);
        res.status(500).json({ message: 'Error retrieving file status.', errorDetails: error.message });
    }
});


module.exports = router;