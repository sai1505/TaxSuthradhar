import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, Clock, LogOut, Menu, X } from 'lucide-react';

const DashboardNav = ({ user, onLogout }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    // Get the first initial from the user's name (from Google Sign-In) or email.
    const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
    const userName = user?.name || 'User';
    const userEmail = user?.email || 'user@example.com';


    // Close profile menu if clicked outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
                setProfileMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const navLinks = [
        { title: 'History', icon: <Clock className="mr-2 h-4 w-4" /> },
        { title: 'Documents', icon: <BookOpen className="mr-2 h-4 w-4" /> }
    ];

    const handleLogoutClick = (e) => {
        e.preventDefault(); // FIX: Prevents the link from navigating to "#"
        onLogout();
    };

    return (
        <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Title */}
                    <div className="flex-shrink-0">
                        <span className="text-2xl font-bold text-white">Tax Suthradhar</span>
                    </div>

                    {/* Desktop Links & Profile */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <a href="#" key={link.title} className="flex items-center text-gray-400 hover:text-white px-3 py-2 rounded-md text-sm font-medium relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:origin-center after:transition-transform after:duration-300 after:scale-x-0 hover:after:scale-x-100">
                                {link.icon} {link.title}
                            </a>
                        ))}

                        {/* Profile Dropdown */}
                        <div className="ml-3 relative" ref={profileMenuRef}>
                            <div>
                                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black font-bold border-2 border-transparent group-hover:border-white transition-colors">
                                        {userInitial}
                                    </div>
                                </button>
                            </div>
                            {profileMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    {/* FIX: The onClick handler now prevents default link behavior */}
                                    <a href="#" onClick={handleLogoutClick} className="flex items-center px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setMenuOpen(!menuOpen)} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none">
                            <span className="sr-only">Open main menu</span>
                            {menuOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            <div className={`fixed inset-0 bg-black z-40 transition-opacity duration-300 ease-in-out md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className={`absolute inset-0 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-5">
                        <button onClick={() => setMenuOpen(false)} className="text-white p-2 rounded-md transition-colors duration-300 hover:bg-gray-800">
                            <X size={32} />
                        </button>
                    </div>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        {navLinks.map((link) => (
                            <a href="#" key={link.title} className="flex items-center text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium">
                                {link.icon} {link.title}
                            </a>
                        ))}
                    </div>
                    <div className="pt-4 pb-3 border-t border-gray-700">
                        <div className="flex items-center px-5">
                            <div className="flex-shrink-0">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
                                    {userInitial}
                                </div>
                            </div>
                            <div className="ml-3">
                                <div className="text-base font-medium leading-none text-white">{userName}</div>
                                <div className="text-sm font-medium leading-none text-gray-400">{userEmail}</div>
                            </div>
                        </div>
                        <div className="mt-3 px-2 space-y-1">
                            {/* FIX: The onClick handler now prevents default link behavior */}
                            <a href="#" onClick={handleLogoutClick} className="flex items-center block px-3 py-2 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                                <LogOut className="mr-3 h-5 w-5" />
                                Logout
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default DashboardNav;
