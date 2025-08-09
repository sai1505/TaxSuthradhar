const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { readUsers, writeUsers } = require('../db/database');
const authenticateToken = require('../middleware/authMiddleware');

// SIGN UP
router.post('/signup', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const users = readUsers();
    if (users.find(user => user.email === email)) {
        return res.status(409).json({ message: 'User with this email already exists.' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { id: `user-${Date.now()}`, email, password: hashedPassword, chats: [] };
    users.push(newUser);
    writeUsers(users);
    res.status(201).json({ message: 'User created successfully!', user: { email } });
});

// SIGN IN (EMAIL & PASSWORD)
router.post('/signin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }
    const users = readUsers();
    const user = users.find(u => u.email === email);
    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ message: 'Invalid email or password.' });
    }

    const userPayload = { id: user.id, email: user.email, name: user.name || user.email.split('@')[0] };
    console.log('1. Signing token with secret:', process.env.JWT_SECRET);
    const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.cookie('token', token, {
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        maxAge: 60 * 60 * 1000,
    });
    res.status(200).json({ message: 'Sign in successful!', user: userPayload });
});

// GOOGLE AUTHENTICATION ROUTE
router.post('/auth/google', async (req, res) => {
    const { idToken } = req.body;
    try {
        console.log("1. Received Google ID Token.");
        const decodedToken = await admin.auth().verifyIdToken(idToken);
        const { email, name, uid } = decodedToken;
        console.log(`2. Token verified for user: ${email}`);

        const users = readUsers();
        let user = users.find(u => u.email === email);

        if (!user) {
            console.log(`3. User not found. Creating new user in db.json...`);
            // Create a new user record with a consistent shape
            user = { id: uid, email, name, authProvider: 'google', password: null, chats: [] };
            users.push(user);
            writeUsers(users);
            console.log(`4. Successfully wrote new user to db.json.`);
        } else {
            console.log(`3. Found existing user: ${email}`);
        }

        const userPayload = { id: user.id, email: user.email, name: user.name };
        console.log('5. Signing JWT token for user.');
        const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'Lax',
            maxAge: 60 * 60 * 1000,
        });

        console.log('6. Sent token cookie to browser. Login successful.');
        res.status(200).json({ message: 'Google sign-in successful!', user: userPayload });

    } catch (error) {
        console.error('ERROR during Google Auth:', error);
        res.status(401).json({ message: 'Authentication failed. Invalid token.' });
    }
});

// CHECK SESSION
router.get('/auth/check-session', authenticateToken, (req, res) => {
    res.status(200).json({ user: req.user });
});

// LOGOUT
router.post('/auth/logout', authenticateToken, (req, res) => {
    res.cookie('token', '', { httpOnly: true, expires: new Date(0) });
    res.status(200).json({ message: 'Logout successful' });
});

module.exports = router;