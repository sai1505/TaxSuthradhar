const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs'); // Import the File System module
const path = require('path'); // Import the Path module
const admin = require('firebase-admin'); // Import Firebase Admin SDK

// --- FIREBASE ADMIN INITIALIZATION ---
// Make sure you have the serviceAccountKey.json file in your server directory
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});


const app = express();
const PORT = process.env.PORT || 5000;

// --- JSON FILE DATABASE (for persistent data) ---
const DB_PATH = path.join(__dirname, 'db.json');

// Helper function to read users from the JSON file
const readUsers = () => {
    try {
        // Check if the file exists before trying to read it
        if (!fs.existsSync(DB_PATH)) {
            // If it doesn't exist, create it with an empty array
            fs.writeFileSync(DB_PATH, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DB_PATH);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading from database:", error);
        return []; // Return empty array on error
    }
};

// Helper function to write users to the JSON file
const writeUsers = (users) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2)); // `null, 2` formats the JSON nicely
    } catch (error) {
        console.error("Error writing to database:", error);
    }
};


// Middleware
app.use(cors());
app.use(express.json());

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('Tax Suthradhar Backend is Running!');
});

// SIGN UP ROUTE (Email/Password)
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const users = readUsers(); // Read current users from file

    // Check if user already exists
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }

    // In a real app, you would HASH the password here before saving.
    const newUser = { id: users.length + 1, email, password };
    users.push(newUser);
    writeUsers(users); // Write the updated user list back to the file

    console.log('--- User Added to db.json ---');
    console.log(users);

    res.status(201).json({ message: 'User created successfully!', user: { email } });
});

// SIGN IN ROUTE (Email/Password)
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    const users = readUsers(); // Read users from file

    const user = users.find(u => u.email === email);

    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    console.log('--- User Signed In from db.json ---');
    console.log('Email:', email);

    res.status(200).json({ message: 'Sign in successful!', user: { email } });
});

// --- GOOGLE AUTHENTICATION ROUTE (New) ---
app.post('/api/auth/google', async (req, res) => {
    const { idToken } = req.body;

    try {
        // Verify the ID token sent from the client
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { uid, email, name } = decodedToken;

        console.log('--- Google Token Verified ---');
        console.log('UID:', uid, 'Email:', email);

        const users = readUsers();
        let user = users.find(u => u.email === email);

        // If the user doesn't exist in our database, create a new entry
        if (!user) {
            user = { id: uid, email, name, authProvider: 'google' };
            users.push(user);
            writeUsers(users);
            console.log('--- New Google User Created ---', user);
        } else {
            console.log('--- Existing Google User Signed In ---', user);
        }

        // In a real app, you would generate your own session token (e.g., a JWT) here.
        res.status(200).json({ message: 'Google sign-in successful!', user: { email, name } });

    } catch (error) {
        console.error('Error verifying Google token:', error);
        res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
