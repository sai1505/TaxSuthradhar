const fs = require('fs');
const path = require('path');

const DB_PATH = path.join(__dirname, '..', 'db.json');

const readUsers = () => {
    try {
        if (!fs.existsSync(DB_PATH)) {
            fs.writeFileSync(DB_PATH, JSON.stringify([]));
            return [];
        }
        const data = fs.readFileSync(DB_PATH);
        const users = JSON.parse(data);
        users.forEach(user => {
            if (!user.chats) user.chats = [];
        });
        return users;
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

module.exports = { readUsers, writeUsers };