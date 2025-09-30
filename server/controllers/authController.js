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
        const { username, email, password } = req.body;

        // 1. Updated Validation
        if (!username || !email || !password) {
            return res.status(400).json({ message: 'Username, email, and password are required.' });
        }

        // 2. Define Keys for the main data and the index
        const userKey = `users/${email}`;
        const usernameKey = `usernames/${username}`;

        // 3. Check if Email is already registered
        try {
            await S3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: userKey }));
            return res.status(409).json({ message: 'Email is already registered.' });
        } catch (error) {
            if (error.name !== 'NotFound') throw error; // Re-throw unexpected errors
        }

        // 4. Check if Username is already taken
        try {
            await S3.send(new HeadObjectCommand({ Bucket: R2_BUCKET_NAME, Key: usernameKey }));
            return res.status(409).json({ message: 'Username is already taken.' });
        } catch (error) {
            if (error.name !== 'NotFound') throw error; // Re-throw unexpected errors
        }

        // 5. Securely Hash the Password
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);

        // 6. Prepare User Data for Storage (now includes username)
        const userData = {
            username,
            email,
            passwordHash,
            createdAt: new Date().toISOString(),
        };

        // 7. Prepare commands to create BOTH the user object and the username index object
        const putUserCommand = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: userKey,
            Body: JSON.stringify(userData),
            ContentType: 'application/json',
        });

        const putUsernameIndexCommand = new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: usernameKey,
            Body: JSON.stringify({ email: email }), // Store the email as a reference
            ContentType: 'application/json',
        });

        // 8. Execute both uploads concurrently
        await Promise.all([
            S3.send(putUserCommand),
            S3.send(putUsernameIndexCommand)
        ]);

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

        // 1. Find the user in the R2 bucket using the NEW key structure
        const userKey = `users/${email}`; // ⬅️ UPDATED
        let userObject;
        try {
            const getCommand = new GetObjectCommand({
                Bucket: R2_BUCKET_NAME,
                Key: userKey, // ⬅️ UPDATED
            });
            userObject = await S3.send(getCommand);
        } catch (error) {
            if (error.name === 'NoSuchKey') {
                return res.status(401).json({ message: 'Invalid credentials.' });
            }
            throw error;
        }

        // 2. Parse the user data from the S3 object body
        const userDataString = await streamToString(userObject.Body);
        const userData = JSON.parse(userDataString);

        // 3. Securely compare the provided password with the stored hash
        const isPasswordCorrect = await bcrypt.compare(password, userData.passwordHash);

        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // 4. Send Success Response (now includes username)
        res.status(200).json({
            success: true,
            message: 'Sign-in successful.',
            user: {
                username: userData.username, // ⬅️ ADDED
                email: userData.email,
                createdAt: userData.createdAt
            }
        });

    } catch (error) {
        console.error('Signin Controller Error:', error);
        res.status(500).json({ message: 'An internal server error occurred.' });
    }
};