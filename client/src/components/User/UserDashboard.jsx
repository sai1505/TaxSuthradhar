import React, { useState, useRef, useEffect } from 'react';
import { PaperAirplaneIcon, DocumentArrowUpIcon, UserIcon, SparklesIcon } from '@heroicons/react/24/solid';

const UserDashboard = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatEndRef = useRef(null);
    const inputRef = useRef(null);

    // AI Avatar using SVG for theme consistency
    const AIAvatar = () => (
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-black border border-white/30 rounded-full">
            <SparklesIcon className="w-5 h-5 text-white" />
        </div>
    );

    // User Avatar using SVG
    const UserAvatar = () => (
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-white rounded-full">
            <UserIcon className="w-5 h-5 text-black" />
        </div>
    );

    // Typing indicator
    const LoadingIndicator = () => (
        <div className="flex items-start gap-4">
            <AIAvatar />
            <div className="flex items-center space-x-1 p-3 bg-black/80 border border-white/20 rounded-lg">
                <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0s' }}></span>
                <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></span>
                <span className="w-2 h-2 bg-white/50 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></span>
            </div>
        </div>
    );


    const handleSendMessage = (e, messageText = input) => {
        if (e) e.preventDefault();
        if (!messageText.trim() || isLoading) return;

        // Add user message
        const newUserMessage = { id: Date.now(), text: messageText, sender: 'user' };
        setMessages(prev => [...prev, newUserMessage]);
        setInput('');
        setIsLoading(true);

        // Simulate AI response
        setTimeout(() => {
            const aiResponse = { id: Date.now() + 1, text: `This is a simulated AI response to: "${messageText}"`, sender: 'ai' };
            setMessages(prev => [...prev, aiResponse]);
            setIsLoading(false);
            // Refocus input after response
            inputRef.current?.focus();
        }, 1500);
    };

    const examplePrompts = [
        "Explain capital gains tax.",
        "What documents do I need for ITR?",
        "Summarize my uploaded tax statement."
    ];

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isLoading]);

    return (
        <div className="h-full w-full flex flex-col items-center bg-black text-white">
            {/* Chat Display Area - Uses flex-1 to grow and fill available space */}
            <div className="w-full max-w-3xl flex-1 overflow-y-auto p-4 custom-scrollbar">
                {messages.length === 0 ? (
                    // Welcome Screen
                    <div className="flex flex-col items-center justify-center h-full text-center">
                        <div className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-white to-white/60 pb-2">
                            Tax Suthradhar
                        </div>
                        <p className="text-white/60 mt-2">Your AI-powered tax assistant</p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-16 w-full">
                            {examplePrompts.map(prompt => (
                                <button
                                    key={prompt}
                                    onClick={(e) => handleSendMessage(e, prompt)}
                                    className="p-4 border border-white/20 rounded-lg text-left hover:bg-white/5 transition-all duration-200"
                                >
                                    <p className="text-sm font-semibold text-white/90">{prompt}</p>
                                </button>
                            ))}
                        </div>
                    </div>
                ) : (
                    // Chat Messages container
                    <div className="space-y-6 mt-40">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex items-start gap-4 ${msg.sender === 'user' ? 'justify-end' : ''}`}>
                                {msg.sender === 'ai' && <AIAvatar />}
                                <div className={`p-3 rounded-lg max-w-[80%] text-sm whitespace-pre-wrap ${msg.sender === 'user'
                                    ? 'bg-white text-black'
                                    : 'bg-black/80 border border-white/20 text-white'
                                    }`}>
                                    {msg.text}
                                </div>
                                {msg.sender === 'user' && <UserAvatar />}
                            </div>
                        ))}
                        {isLoading && <LoadingIndicator />}
                        <div ref={chatEndRef} />
                    </div>
                )}
            </div>

            {/* Input Area - No longer positioned absolutely */}
            <div className="w-full flex-shrink-0 flex justify-center p-4 bg-gradient-to-t from-black via-black to-transparent">
                <div className="w-full max-w-3xl">
                    <form onSubmit={handleSendMessage} className="relative flex items-center">
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            placeholder="Ask me anything..."
                            rows={1}
                            className="flex-grow p-3 pr-24 resize-none bg-black/50 border border-white/20 rounded-lg text-white placeholder-white/50 focus:outline-none focus:border-white/50 transition-all duration-200"
                            style={{ minHeight: '48px', maxHeight: '200px' }}
                        />
                        <div className="absolute right-3 flex items-center space-x-2">
                            <button
                                type="button"
                                onClick={() => document.getElementById('file-upload').click()}
                                className="p-2 rounded-full hover:bg-white/10 transition-colors"
                                aria-label="Upload file"
                            >
                                <DocumentArrowUpIcon className="h-5 w-5 text-white/70" />
                            </button>
                            <input type="file" id="file-upload" className="hidden" />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="p-2 rounded-full bg-white disabled:bg-white/50 text-black transition-all duration-200 hover:scale-110"
                                aria-label="Send message"
                            >
                                <PaperAirplaneIcon className="h-5 w-5" />
                            </button>
                        </div>
                    </form>
                    <p className="text-xs text-center text-white/40 mt-2 px-2">
                        Tax Suthradhar may produce inaccurate information. Please verify important details.
                    </p>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255, 255, 255, 0.4); }
            `}</style>
        </div>
    );
};

export default UserDashboard;

