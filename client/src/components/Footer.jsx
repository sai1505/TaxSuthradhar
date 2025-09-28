import React from 'react';

const Footer = () => {

    return (
        <footer className="bg-black border-t border-white/10 text-gray-400">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">

                    {/* Copyright and Legal Links */}
                    <div className="flex flex-col sm:flex-row items-center text-white">
                        {/* Left side */}
                        <p className="text-sm">
                            &copy; {new Date().getFullYear()} Tax Suthradhar. All rights reserved.
                        </p>

                        {/* Right side with left margin */}
                        <div className="mt-2 sm:mt-0 sm:ml-166 space-x-4">
                            <a href="#" className="text-xs text-white/70 hover:text-white transition-colors duration-300">
                                Privacy Policy
                            </a>
                            <a href="#" className="text-xs text-white/70 hover:text-white transition-colors duration-300">
                                Terms of Service
                            </a>
                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default Footer;
