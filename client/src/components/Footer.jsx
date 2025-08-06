import React from 'react';

const Footer = () => {
    return (
        // The footer uses a black background and a sharp top border.
        <footer className="bg-black border-t border-gray-800 mt-auto">
            <div className="container mx-auto px-6 py-6">
                {/* The flex container now centers the content. */}
                <div className="flex justify-center items-center">

                    {/* The copyright notice is now centered. */}
                    <p className="text-sm text-gray-500">
                        &copy; {new Date().getFullYear()} Tax Suthradhar. All Rights Reserved.
                    </p>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
