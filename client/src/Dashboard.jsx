// src/DashboardPage.jsx

import React, { useState } from 'react';
import DashboardNav from './components/DashboardNav';
import ChatInterface from './components/ChatInterface';
import Footer from './components/Footer';
import HistoryPage from './components/HistoryPage'; // NEW: Import HistoryPage

const DashboardPage = ({ user, onLogout }) => {
    const [activePage, setActivePage] = useState('new-chat');
    // MODIFIED: This key is now only for forcing a brand NEW chat
    const [newChatKey, setNewChatKey] = useState(Date.now());

    // NEW: State to hold the data of a chat being resumed
    const [resumedChat, setResumedChat] = useState(null);

    // This function is passed to the Nav
    const handleNavigate = (page) => {
        setActivePage(page);
        if (page === 'new-chat') {
            // When user explicitly clicks "New Chat", clear any resumed chat
            // and update the key to force a full reset of the interface
            setResumedChat(null);
            setNewChatKey(Date.now());
        }
    };

    // NEW: This function is passed to the HistoryPage
    const handleResumeChat = async (chatId) => {
        // 1. Fetch the full content of the selected chat
        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chat/${chatId}`, {
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Could not load chat.');
            const chatData = await response.json();

            // 2. Store this data in our state
            setResumedChat(chatData);

            // 3. Switch the view to the chat interface
            setActivePage('new-chat');
        } catch (error) {
            console.error("Failed to resume chat:", error);
            alert("Sorry, we couldn't load that conversation.");
        }
    };

    const renderActivePage = () => {
        switch (activePage) {
            case 'new-chat':
                // MODIFIED: The key and props are now dynamic
                // If we are resuming a chat, its ID is the key.
                // If it's a new chat, the timestamp key forces a reset.
                return (
                    <ChatInterface
                        key={resumedChat ? resumedChat.id : newChatKey}
                        user={user}
                        onLogout={onLogout}
                        initialChatId={resumedChat?.id}
                        initialMessages={resumedChat?.messages}
                    />
                );
            case 'history':
                // Pass the handler function as a prop to HistoryPage
                return <HistoryPage onResumeChat={handleResumeChat} />;
            case 'documents':
                return <div className="p-6 text-white">Documents Page Coming Soon...</div>;
            default:
                return <ChatInterface key={newChatKey} user={user} onLogout={onLogout} />;
        }
    };

    return (
        <div className="flex flex-col h-screen bg-black text-gray-200">
            <DashboardNav
                user={user}
                onLogout={onLogout}
                onNavigate={handleNavigate}
                activePage={activePage}
            />
            <main className="flex-1 flex flex-col overflow-hidden">
                {renderActivePage()}
            </main>
            <Footer />
        </div>
    );
};

export default DashboardPage;