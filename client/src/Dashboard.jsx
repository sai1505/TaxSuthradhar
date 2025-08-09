import React, { useState, useEffect, useRef } from 'react';
import DashboardNav from './components/DashboardNav';
import Footer from './components/Footer';
import { ArrowUp, Sparkles, User } from 'lucide-react';

const Dashboard = ({ user, onLogout }) => {
    // --- STATE, EFFECTS, and LOGIC (No changes needed) ---
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState([
        {
            sender: 'ai',
            text: `Hello, ${user?.name || 'there'}! How can I help you analyze your tax documents today?`
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    // Effect for dark theme body background
    useEffect(() => {
        document.documentElement.style.backgroundColor = '#000000'; // Set base body color to black
        return () => {
            document.documentElement.style.backgroundColor = ''; // Revert on unmount
        };
    }, []);

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!prompt.trim()) return;

        setIsLoading(true);
        const currentPrompt = prompt;
        const userMessage = { sender: 'user', text: currentPrompt };

        setMessages(prev => [...prev, userMessage]);
        setPrompt('');

        try {
            const chatResponse = await fetch(`${import.meta.env.VITE_API_URL}/api/chat`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: currentPrompt })
            });

            if (!chatResponse.ok) {
                if (chatResponse.status === 401 || chatResponse.status === 403) {
                    alert("Your session has expired. Please log in again.");
                    onLogout();
                    return;
                }
                const errorData = await chatResponse.json();
                throw new Error(errorData.message || 'Failed to get response from AI.');
            }

            const chatData = await chatResponse.json();
            const aiMessage = { sender: 'ai', text: chatData.response };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { sender: 'ai', text: `Sorry, an error occurred: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    // --- RENDER (Updated for Dark Theme) ---
    return (
        // Main container with a black background and light text
        <div className="flex flex-col h-screen bg-black text-gray-200">
            <DashboardNav user={user} onLogout={onLogout} activePage="new-chat" />

            <main className="flex-1 flex flex-col overflow-hidden">
                {/* Chat messages container */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6">
                    <div className="max-w-4xl mx-auto space-y-6">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'
                                    }`}
                            >
                                {/* AI AVATAR */}
                                {message.sender === 'ai' && (
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-white">
                                        <Sparkles className="h-5 w-5 text-black" />
                                    </div>
                                )}

                                {/* MESSAGE BUBBLE */}
                                <div className={`max-w-lg rounded-2xl px-4 py-2.5 ${message.sender === 'user'
                                    ? 'bg-gray-700 text-white rounded-br-none'
                                    : 'bg-gray-800 text-gray-200 rounded-bl-none'
                                    }`}>
                                    <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                                </div>

                                {/* USER AVATAR */}
                                {message.sender === 'user' && (
                                    <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-gray-600">
                                        <User className="h-5 w-5 text-gray-300" />
                                    </div>
                                )}
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                </div>

                {/* Input form area */}
                <div className="w-full px-4 pb-4 md:px-6 md:pb-6 bg-black">
                    <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                        <div className="flex items-center gap-2 md:gap-3 p-2 bg-gray-900 rounded-xl border border-gray-700">
                            <textarea
                                value={prompt}
                                onChange={(e) => setPrompt(e.target.value)}
                                placeholder="Message TaxAI..."
                                disabled={isLoading}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' && !e.shiftKey) {
                                        e.preventDefault();
                                        handleSendMessage(e);
                                    }
                                }}
                                className="flex-1 bg-transparent resize-none outline-none text-gray-200 placeholder-gray-500 max-h-48"
                                rows="1"
                                onInput={(e) => {
                                    e.target.style.height = 'auto';
                                    e.target.style.height = `${e.target.scrollHeight}px`;
                                }}
                            />
                            <button
                                type="submit"
                                className="p-2.5 bg-white text-black rounded-lg transition-colors hover:bg-gray-300 disabled:bg-gray-800 disabled:text-gray-500 disabled:cursor-not-allowed"
                                disabled={!prompt.trim() || isLoading}
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-t-2 border-black rounded-full animate-spin"></div>
                                ) : (
                                    <ArrowUp className="h-5 w-5" />
                                )}
                                <span className="sr-only">Send</span>
                            </button>
                        </div>
                    </form>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;