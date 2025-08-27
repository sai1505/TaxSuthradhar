// --- Run with: node testChatFlow.js ---
const fetch = require('node-fetch');

const API_URL = 'http://localhost:5000/api';
const TEST_EMAIL = 'sai@gmail.com'; // replace with an existing user
const TEST_PASSWORD = '123';  // replace with that user's password

(async () => {
    try {
        // 1️⃣ Sign in
        const signinRes = await fetch(`${API_URL}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: TEST_EMAIL, password: TEST_PASSWORD })
        });

        const cookies = signinRes.headers.get('set-cookie');
        if (!cookies) {
            console.error('❌ No cookie received. Check /signin route.');
            return;
        }
        console.log('✅ Got cookie:', cookies);

        // 2️⃣ Call /chat with cookie
        const chatRes = await fetch(`${API_URL}/chat`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookies // manually send the token cookie
            },
            body: JSON.stringify({ prompt: 'Hello from test script!' })
        });

        if (chatRes.status === 401) {
            console.error('❌ Unauthorized — token not accepted.');
        } else {
            const data = await chatRes.json();
            console.log('💬 Chat Response:', data);
        }

    } catch (err) {
        console.error('🔥 Error in test script:', err);
    }
})();
