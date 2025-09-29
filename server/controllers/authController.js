import bcrypt from 'bcrypt';
import { PutObjectCommand, HeadObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import { S3, R2_BUCKET_NAME } from '../config/r2-config.js';

// --- Helper function to stream S3 body to a string ---
const streamToString = (stream) =>
    new Promise((resolve, reject) => {
        const chunks = [];
        stream.on("data", (chunk) => chunks.push(chunk));
        stream.on("error", reject);
        stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    });


export const signupUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // 1. Check if the user already exists using HeadObjectCommand
        try {
            const headCommand = new HeadObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: email,
            });
            await S3.send(headCommand);
            return res.status(409).json({ message: 'Email is already registered.' });

        } catch (error) {
            if (error.name !== 'NotFound') {
                throw error;
            }
        }

        // 2. Securely Hash the Password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 3. Prepare User Data for Storage
        const userData = {
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
        };

        // 4. Upload the New User Data to R2
        const putCommand = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: email,
            Body: JSON.stringify(userData),
            ContentType: 'application/json',
        });
        await S3.send(putCommand);

        res.status(201).json({ success: true, message: 'Account created successfully.' });

    } catch (error) {
        console.error('Signup Controller Error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};


// --- NEW: Sign-in User Controller ---
export const signinUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required.' });
        }

        // 1. Find the user in the R2 bucket
        let userObject;
        try {
            const getCommand = new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: email,
            });
            userObject = await S3.send(getCommand);
        } catch (error) {
            // If user object is not found, it's an invalid login attempt
            if (error.name === 'NoSuchKey') {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
            // For other errors, throw them to be caught by the outer catch block
            throw error;
        }

        // 2. Parse the user data from the S3 object body
        const userDataString = await streamToString(userObject.Body);
        const userData = JSON.parse(userDataString);

        // 3. Securely compare the provided password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(password, userData.passwordHash);

        if (!isPasswordCorrect) {
            // If passwords don't match, it's an invalid login attempt
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 4. Send Success Response
        // In a real app, you would generate and send a JWT (JSON Web Token) here.
        res.status(200).json({
            success: true,
            message: 'Sign-in successful.',
            user: {
                email: userData.email,
                createdAt: userData.createdAt
            }
        });

    } catch (error) {
        console.error('Signin Controller Error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};