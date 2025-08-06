import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

// The Navbar now accepts an `activePage` prop to know which link to highlight.
const Navbar = ({ onNavigate, activePage }) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const navLinks = [
        { title: 'Home', page: 'home' },
        { title: 'Sign In', page: 'signin' },
        { title: 'Sign Up', page: 'signup' },
    ];

    const handleNavClick = (page) => {
        onNavigate(page);
        setIsOpen(false);
    };

    return (
        <>
            <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">

                    <button
                        onClick={() => handleNavClick('home')}
                        className="text-2xl font-bold text-white text-left transition-opacity duration-300 hover:opacity-80"
                    >
                        Tax Suthradhar
                    </button>

                    {/* Desktop Links: Now with active state styling */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const isActive = activePage === link.page;
                            return (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavClick(link.page)}
                                    // The text color and underline are now conditional based on `isActive`.
                                    className={`px-4 py-2 relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:origin-center after:transition-transform after:duration-300 
                    ${isActive
                                            ? 'text-white after:scale-x-100'
                                            : "text-gray-400 hover:text-white hover:after:scale-x-100 after:scale-x-0"
                                        }`
                                    }
                                >
                                    {link.title}
                                </button>
                            );
                        })}
                    </div>

                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(true)}
                            className="text-white p-2 rounded-md transition-colors duration-300 hover:bg-gray-800"
                        >
                            <Menu size={28} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full-screen Mobile Menu: Now with active state styling */}
            <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out md:hidden ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute inset-0 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-5">
                        <button onClick={() => setIsOpen(false)} className="text-white p-2 rounded-md transition-colors duration-300 hover:bg-gray-800">
                            <X size={32} />
                        </button>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full -mt-20">
                        {navLinks.map((link) => {
                            const isActive = activePage === link.page;
                            return (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavClick(link.page)}
                                    // The active mobile link gets a subtle background highlight.
                                    className={`w-full text-center text-3xl font-medium py-4 border-b border-gray-800 transition-colors duration-300 
                    ${isActive
                                            ? 'text-white bg-gray-900'
                                            : 'text-gray-400 hover:text-white'
                                        }`
                                    }
                                >
                                    {link.title}
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;
