import React from 'react';

// Simple, text-based icons to avoid using SVG and adhere to the theme.
const FileIcon = () => (
    <div className="w-8 h-10 border-2 border-white/50 rounded-md flex flex-col items-center pt-1">
        <span className="block h-0.5 w-4 bg-white/50 mt-1"></span>
        <span className="block h-0.5 w-4 bg-white/50 mt-1"></span>
        <span className="block h-0.5 w-2 bg-white/50 mt-1"></span>
    </div>
);

const DeleteIcon = () => (
    <span className="font-mono text-xl leading-none">&times;</span>
);

const UserDocuments = () => {
    // Mock data to simulate uploaded documents.
    const mockDocuments = [
        {
            id: 'doc1',
            filename: 'Form-16_AY2024-25.pdf',
            uploadDate: 'September 28, 2025',
            size: '842 KB',
        },
        {
            id: 'doc2',
            filename: 'Capital_Gains_Statement_Q3.xlsx',
            uploadDate: 'September 15, 2025',
            size: '1.2 MB',
        },
        {
            id: 'doc3',
            filename: 'Housing_Loan_Interest_Cert.jpeg',
            uploadDate: 'August 02, 2025',
            size: '2.5 MB',
        },
    ];

    const hasDocuments = mockDocuments.length > 0;

    return (
        <div className="w-full mt-20 h-full bg-black text-white flex justify-center p-4 sm:p-8">
            <div className="w-full max-w-3xl">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-8 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-white">
                        My Documents
                    </h1>
                    {/* Primary Button (CTA) */}
                    <button className="w-full sm:w-auto bg-white text-black px-5 py-2.5 rounded-lg text-sm font-semibold hover:scale-105 transition-transform duration-200">
                        Upload New Document
                    </button>
                </div>

                {/* Documents List or Empty State */}
                <div className="space-y-4">
                    {hasDocuments ? (
                        mockDocuments.map(doc => (
                            <div
                                key={doc.id}
                                className="group flex items-center justify-between p-4 bg-black border border-white/10 rounded-lg transition-all duration-200 hover:border-white/40 hover:bg-white/5"
                            >
                                <div className="flex items-center gap-4">
                                    <FileIcon />
                                    <div className="flex flex-col">
                                        <p className="font-medium text-white/90">
                                            {doc.filename}
                                        </p>
                                        <p className="text-sm text-white/60 mt-1">
                                            {`Uploaded ${doc.uploadDate} • ${doc.size}`}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {/* Secondary Button */}
                                    <button className="px-3 py-1.5 border border-white text-xs rounded-md hover:bg-white hover:text-black transition-colors">
                                        View
                                    </button>
                                    <button
                                        aria-label="Delete document"
                                        className="p-2 text-white/50 hover:text-white hover:bg-white/10 rounded-full"
                                    >
                                        <DeleteIcon />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center border-2 border-dashed border-white/10 rounded-lg py-20">
                            <p className="text-white/60">No documents have been uploaded.</p>
                            <p className="text-white/40 text-sm mt-2">Upload a document to get started with your analysis.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UserDocuments;
