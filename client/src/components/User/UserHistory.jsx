import React from 'react';

// A simple 'X' icon for the delete button, without using SVG
const DeleteIcon = () => (
    <span className="font-mono text-lg leading-none">&times;</span>
);

const UserHistory = () => {
    // Mock data to simulate chat history. In a real app, this would be fetched from an API.
    const mockHistory = [
        {
            id: 1,
            title: "Explanation of Capital Gains Tax...",
            date: "Today",
        },
        {
            id: 2,
            title: "Documents required for ITR filing...",
            date: "Yesterday",
        },
        {
            id: 3,
            title: "How to handle deductions for a home office?",
            date: "September 30, 2025",
        },
        {
            id: 4,
            title: "Summarizing my Form-16 statement.",
            date: "September 28, 2025",
        },
    ];

    const hasHistory = mockHistory.length > 0;

    return (
        <div className="w-full mt-20 h-full bg-black text-white flex justify-center p-4 sm:p-8">
            <div className="w-full max-w-3xl">
                {/* Header Section */}
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        Chat History
                    </h1>
                    {hasHistory && (
                        <button className="px-4 py-2 border border-white/30 text-sm text-white/80 rounded-lg hover:bg-white hover:text-black transition-colors duration-200">
                            Clear All History
                        </button>
                    )}
                </div>

                {/* History List or Empty State */}
                <div className="space-y-3">
                    {hasHistory ? (
                        mockHistory.map(item => (
                            <div
                                key={item.id}
                                className="group flex items-center justify-between p-4 bg-black border border-white/10 rounded-lg cursor-pointer transition-all duration-200 hover:border-white/40 hover:bg-white/5"
                            >
                                <div className="flex flex-col">
                                    <p className="font-medium text-white/90 truncate max-w-xs sm:max-w-md">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-white/60 mt-1">
                                        {item.date}
                                    </p>
                                </div>
                                <button
                                    aria-label="Delete chat"
                                    className="p-2 opacity-0 group-hover:opacity-100 text-white/50 hover:text-white hover:bg-white/10 rounded-full transition-opacity duration-200"
                                >
                                    <DeleteIcon />
                                </button>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20">
                            <p className="text-white/60">No chat history found.</p>
                            <p className="text-white/40 text-sm mt-2">Start a new conversation to see it here.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserHistory;