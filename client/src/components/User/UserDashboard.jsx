import React, { useState, useRef, useEffect } from 'react';
import { useChat } from './UserChatContext';

// Using inline SVGs for icons to keep it self-contained
const PaperAirplaneIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
    </svg>
);

const DocumentArrowUpIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M11.47 2.47a.75.75 0 011.06 0l4.5 4.5a.75.75 0 01-1.06 1.06l-3.22-3.22V16.5a.75.75 0 01-1.5 0V4.81L8.03 8.03a.75.75 0 01-1.06-1.06l4.5-4.5zM3 15.75a.75.75 0 01.75.75v2.25a1.5 1.5 0 001.5 1.5h13.5a1.5 1.5 0 001.5-1.5V16.5a.75.75 0 011.5 0v2.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V16.5a.75.75 0 01.75-.75z" clipRule="evenodd" />
    </svg>
);

const UserIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
    </svg>
);

const SparklesIcon = (props) => (
    <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.007z" clipRule="evenodd" />
    </svg>
);


const UserDashboard = () => {
    const { messages, isLoading, input, setInput, handleSendMessage } = useChat();
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
            {/* Chat Display Area */}
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
                    <div className="space-y-6 pt-10 pb-10">
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

            {/* Input Area */}
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

            <style jsx global>{`
                body, html, #root { height: 100%; margin: 0; font-family: sans-serif; }
                .custom-scrollbar::-webkit-scrollbar { width: 6px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background-color: rgba(255, 255, 255, 0.2); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: rgba(255, 255, 255, 0.4); }
            `}</style>
        </div>
    );
};

export default UserDashboard;
