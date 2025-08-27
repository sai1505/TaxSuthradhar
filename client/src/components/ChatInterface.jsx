import React, { useState, useEffect, useRef } from 'react';
// NEW: Imported the X icon
import { ArrowUp, Sparkles, User, Paperclip, X } from 'lucide-react';

const ChatInterface = ({ user, onLogout, initialChatId = null, initialMessages = null }) => {
    const [prompt, setPrompt] = useState('');
    const [messages, setMessages] = useState(
        initialMessages || [
            {
                sender: 'ai',
                text: `Hello, ${user?.name || 'there'}! How can I help you today?`
            }
        ]
    );
    const [isLoading, setIsLoading] = useState(false);
    const [chatId, setChatId] = useState(initialChatId);

    // NEW & FIXED: Declared the state for the attached file
    const [attachedFile, setAttachedFile] = useState(null);

    const chatEndRef = useRef(null);
    const fileInputRef = useRef(null);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

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
                body: JSON.stringify({
                    prompt: currentPrompt,
                    chatId: chatId,
                    file: attachedFile // This now correctly references the state variable
                })
            });

            if (!chatResponse.ok) {
                throw new Error('Failed to get response from AI.');
            }

            const chatData = await chatResponse.json();
            const aiMessage = { sender: 'ai', text: chatData.response };
            setMessages(prev => [...prev, aiMessage]);

            if (chatData.chatId) {
                setChatId(chatData.chatId);
            }

        } catch (error) {
            console.error("Error sending message:", error);
            const errorMessage = { sender: 'ai', text: `Sorry, an error occurred: ${error.message}` };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleFileUploadClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileSelected = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        setAttachedFile(null);
        setIsLoading(true);
        setMessages(prev => [...prev, { sender: 'user', text: `Attaching file: ${file.name}` }]);

        const formData = new FormData();
        formData.append('document', file);

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/upload`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) throw new Error('File upload failed.');

            const result = await response.json();
            setAttachedFile({ fileId: result.fileId, fileName: result.fileName });

            const aiMessage = { sender: 'ai', text: `File "${result.fileName}" is attached. You can now ask questions about it.` };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            setMessages(prev => [...prev, { sender: 'ai', text: `Sorry, an error occurred: ${error.message}` }]);
        } finally {
            setIsLoading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    return (
        <>
            <div className="flex-1 overflow-y-auto p-4 md:p-6">
                <div className="max-w-4xl mx-auto space-y-6">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`flex items-end gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                            {message.sender === 'ai' && (
                                <div className="flex-shrink-0 h-8 w-8 rounded-full flex items-center justify-center bg-white">
                                    <Sparkles className="h-5 w-5 text-black" />
                                </div>
                            )}
                            <div className={`max-w-lg rounded-2xl px-4 py-2.5 ${message.sender === 'user'
                                ? 'bg-gray-700 text-white rounded-br-none'
                                : 'bg-gray-800 text-gray-200 rounded-bl-none'
                                }`}>
                                <p className="leading-relaxed whitespace-pre-wrap">{message.text}</p>
                            </div>
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
            <div className="w-full px-4 pb-4 md:px-6 md:pb-6 bg-black">
                {attachedFile && (
                    <div className="max-w-4xl mx-auto mb-2">
                        <div className="flex items-center justify-between bg-gray-700 text-white px-3 py-1.5 rounded-lg text-sm">
                            <div className="flex items-center gap-2">
                                <Paperclip className="h-4 w-4" />
                                <span className="font-medium">Attached:</span>
                                <span>{attachedFile.fileName}</span>
                            </div>
                            <button onClick={() => setAttachedFile(null)} className="p-1 rounded-full hover:bg-gray-600">
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    </div>
                )}
                <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-2 md:gap-3 p-2 bg-gray-900 rounded-xl border border-gray-700">
                        <button
                            type="button"
                            onClick={handleFileUploadClick}
                            className="p-2.5 text-gray-400 rounded-lg transition-colors hover:text-white disabled:text-gray-600"
                            disabled={isLoading}
                        >
                            <Paperclip className="h-5 w-5" />
                            <span className="sr-only">Upload Document</span>
                        </button>
                        <input
                            type="file"
                            ref={fileInputRef}
                            onChange={handleFileSelected}
                            className="hidden"
                        />
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            placeholder="Ask a question about your document..."
                            disabled={isLoading}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault();
                                    handleSendMessage(e);
                                }
                            }}
                            className="flex-1 bg-transparent resize-none outline-none text-gray-200 placeholder-gray-500 max-h-48"
                            rows="1"
                        />
                        <button
                            type="submit"
                            className="p-2.5 bg-white text-black rounded-lg transition-colors hover:bg-gray-300 disabled:bg-gray-800 disabled:text-gray-500"
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
        </>
    );
};

export default ChatInterface;
