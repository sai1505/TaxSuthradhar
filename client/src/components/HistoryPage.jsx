// src/components/HistoryPage.jsx

import React, { useState, useEffect } from 'react';
import { MessageSquare, Clock } from 'lucide-react';

const HistoryPage = ({ onResumeChat }) => {
    const [chats, setChats] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/api/chats`, {
                    credentials: 'include',
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch chat history.');
                }
                const data = await response.json();
                setChats(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchHistory();
    }, []);

    if (isLoading) {
        return <div className="p-6 text-center text-stone-400">Loading History...</div>;
    }

    if (error) {
        return <div className="p-6 text-center text-red-400">Error: {error}</div>;
    }

    return (
        // CHANGED: Using a deep gray for the "paper" and off-white for "ink"
        <div className="flex-1 overflow-y-auto p-4 md:p-6 bg-black text-stone-300">
            <div className="max-w-4xl mx-auto">
                {chats.length === 0 ? (
                    <div className="text-center text-stone-500 py-10">
                        <MessageSquare className="mx-auto h-12 w-12 text-stone-600" />
                        <p className="mt-4">No past conversations found.</p>
                    </div>
                ) : (
                    <ul className="space-y-3">
                        {chats.map((chat) => (
                            <li key={chat.id}>
                                {/* CHANGED: Each item is a distinct entry with a subtle border that brightens on hover */}
                                <button
                                    onClick={() => onResumeChat(chat.id)}
                                    className="w-full text-left p-4 bg-gray-900 border border-stone-800 hover:border-stone-500 transition-all duration-300"
                                >
                                    <p className="font-semibold text-lg text-stone-100 truncate">{chat.title}</p>
                                    <div className="flex items-center text-sm text-stone-400 mt-2 font-mono">
                                        <Clock className="h-4 w-4 mr-2" />
                                        <span>{new Date(chat.createdAt).toLocaleString()}</span>
                                    </div>
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default HistoryPage;