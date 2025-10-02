import React, { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import UserDashboardNavbar from './UserDashboardNavbar';
import UserChatContext from './UserChatContext';

function UserDashboardLayout() {
    const navigate = useNavigate();

    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSendMessage = async (e, messageText = input) => {
        if (e) e.preventDefault();
        if (!messageText.trim() || isLoading) return;

        const newUserMessage = { id: Date.now(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('http://127.0.0.1:8000/invoke', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: messageText }),
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            const aiResponse = { id: Date.now() + 1, text: data.response, sender: 'ai' };
            setMessages(prev => [...prev, aiResponse]);
        } catch (error) {
            console.error('Error fetching from API:', error);
            const errorMessage = { id: Date.now() + 1, text: `Sorry, an error occurred.`, sender: 'ai' };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleNewChat = async () => {
        if (messages.length === 0) {
            navigate('/dashboard');
            return;
        }

        const userEmail = sessionStorage.getItem('userEmail');
        if (!userEmail) {
            alert("Could not save chat: User email not found.");
            return;
        }
        try {
            await fetch('http://127.0.0.1:8000/save-chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: userEmail, messages: messages }),
            });
            setMessages([]);
            navigate('/dashboard');
        } catch (error) {
            console.error("Error saving chat:", error);
            alert("Sorry, there was a problem saving your chat.");
        }
    };

    const contextValue = {
        messages,
        input,
        setInput,
        isLoading,
        handleSendMessage
    };

    return (
        <div className="h-screen bg-black text-white flex flex-col">
            <UserDashboardNavbar onNewChat={handleNewChat} />
            <main className="flex-1 overflow-hidden">
                <UserChatContext.Provider value={contextValue}>
                    <Outlet />
                </UserChatContext.Provider>
            </main>
        </div>
    );
}

export default UserDashboardLayout;

