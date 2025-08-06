const express = require('express');
const cors = require('cors');
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');
// --- NEW DEPENDENCIES ---
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

// --- FIREBASE ADMIN INITIALIZATION ---
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = express();
const PORT = process.env.PORT || 5000;

// --- JSON FILE DATABASE ---
const DB_PATH = path.join(__dirname, 'db.json');
const readUsers = () => {
    try {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DB_PATH);
        return JSON.parse(data);
    } catch (error) {
        console.error("Error reading from database:", error);
        return [];
    }
};
const writeUsers = (users) => {
    try {
        fs.writeFileSync(DB_PATH, JSON.stringify(users, null, 2));
    } catch (error) {
        console.error("Error writing to database:", error);
    }
};

// --- MIDDLEWARE ---
// FIX: Update CORS to allow credentials (cookies) from your React app's origin
// This now accepts an array of origins, allowing both common development ports.
app.use(cors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser()); // Use cookie-parser middleware

// --- ROUTES ---

app.get('/', (req, res) => {
    res.send('Tax Suthradhar Backend is Running!');
});

// SIGN UP ROUTE (No changes needed here)
app.post('/api/signup', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const users = readUsers();
    const existingUser = users.find(user => user.email === email);
    if (existingUser) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }
    const newUser = { id: users.length + 1, email, password };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: 'User created successfully!', user: { email } });
});

// SIGN IN ROUTE (Email/Password)
app.post('/api/signin', (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user || user.password !== password) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // --- FIX: Create JWT and set it as a cookie ---
    const userPayload = { email: user.email, name: user.name || user.email.split('@')[0] };
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true, // Makes the cookie inaccessible to client-side scripts
        secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
        sameSite: 'strict',
    });

    res.status(200).json({ message: 'Sign in successful!', user: userPayload });
});

// GOOGLE AUTHENTICATION ROUTE
app.post('/api/auth/google', async (req, res) => {
    const { idToken } = req.body;
    try {
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name } = decodedToken;
        const users = readUsers();
        let user = users.find(u => u.email === email);
        if (!user) {
            user = { id: decodedToken.uid, email, name, authProvider: 'google' };
            users.push(user);
            writeUsers(users);
        }

        // --- FIX: Create JWT and set it as a cookie ---
        const userPayload = { email: user.email, name: user.name };
        const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
        });

        res.status(200).json({ message: 'Google sign-in successful!', user: userPayload });
    } catch (error) {
        console.error('Error verifying Google token:', error);

        // FIX: Provide more specific error feedback to the client for easier debugging.
        let message = 'Authentication failed. Invalid token.';
        if (error.code === 'auth/id-token-expired') {
            message = 'Authentication token has expired. Please sign in again.';
        } else if (error.code === 'auth/argument-error') {
            message = 'The token sent from the client was invalid.';
        } else if (error.message && error.message.includes('Firebase ID token has a future "iat" claim.')) {
            message = 'Authentication failed due to server clock skew. Please check your server time is synchronized.';
        }

        res.status(401).json({ message });
    }
});

// --- NEW: CHECK SESSION ROUTE ---
app.get('/api/auth/check-session', (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // The token is valid, send back the user data.
        res.status(200).json({ user: decoded });
    } catch (error) {
        // The token is invalid or expired.
        return res.status(401).json({ message: 'Session expired or invalid' });
    }
});

// --- NEW: LOGOUT ROUTE ---
app.post('/api/auth/logout', (req, res) => {
    // Clear the cookie by setting an expired one.
    res.cookie('token', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logout successful' });
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
