import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Clock, BookOpen, MessageSquarePlus, LogOut } from 'lucide-react';

const DashboardNav = ({ user, onLogout, onNavigate, activePage }) => {
    const [menuOpen, setMenuOpen] = useState(false);
    const [profileMenuOpen, setProfileMenuOpen] = useState(false);
    const profileMenuRef = useRef(null);

    const userInitial = user?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U';
    const userName = user?.name || 'User';
    const userEmail = user?.email || 'user@example.com';

    useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [menuOpen]);

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
        { title: 'New Chat', page: 'new-chat', icon: <MessageSquarePlus className="mr-2 h-4 w-4" /> },
        { title: 'History', page: 'history', icon: <Clock className="mr-2 h-4 w-4" /> },
        { title: 'Documents', page: 'documents', icon: <BookOpen className="mr-2 h-4 w-4" /> },
    ];

    const handleNavClick = (page) => {
        onNavigate(page);
        setMenuOpen(false);
    };

    const handleLogoutClick = (e) => {
        e.preventDefault();
        onLogout();
    };

    return (
        <>
            <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
                {/* MODIFICATION: Layout now perfectly matches the main Navbar. Padding is py-3. */}
                <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
                    <button
                        onClick={() => handleNavClick('new-chat')}
                        className="text-2xl font-bold text-white text-left transition-opacity duration-300 hover:opacity-80"
                    >
                        Tax Suthradhar
                    </button>

                    {/* MODIFICATION: Desktop links and profile menu are grouped on the right. */}
                    <div className="hidden md:flex items-center space-x-2">
                        {navLinks.map((link) => {
                            const isActive = activePage === link.page;
                            return (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavClick(link.page)}
                                    className={`flex items-center px-4 py-2 relative transition-colors duration-300 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[2px] after:bg-white after:origin-center after:transition-transform after:duration-300 
                                    ${isActive
                                            ? 'text-white after:scale-x-100'
                                            : "text-gray-400 hover:text-white hover:after:scale-x-100 after:scale-x-0"
                                        }`}
                                >
                                    {link.icon}
                                    {link.title}
                                </button>
                            );
                        })}

                        {/* Profile Dropdown is now part of the right-side group */}
                        <div className="ml-3 relative" ref={profileMenuRef}>
                            <div>
                                <button onClick={() => setProfileMenuOpen(!profileMenuOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-white">
                                    <span className="sr-only">Open user menu</span>
                                    <div className="h-8 w-8 rounded-full bg-white flex items-center justify-center text-black font-bold">
                                        {userInitial}
                                    </div>
                                </button>
                            </div>
                            {profileMenuOpen && (
                                <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg py-1 bg-gray-900 ring-1 ring-black ring-opacity-5">
                                      <div className="px-4 py-3 border-b border-gray-700">
                                        <p className="text-sm text-gray-400">Signed in as</p>
                                        <p className="text-sm font-medium text-white truncate" title={userEmail}>
                                            {userEmail}
                                        </p>
                                    </div>
                                    <a href="#" onClick={handleLogoutClick} className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-200 hover:bg-gray-800">
                                        <LogOut className="mr-3 h-5 w-5" />
                                        Logout
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="md:hidden">
                        <button onClick={() => setMenuOpen(true)} className="text-white p-2 rounded-md">
                            <Menu size={28} />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Full-screen mobile menu - structure remains the same */}
            <div className={`fixed inset-0 bg-black z-50 transition-opacity duration-300 ease-in-out md:hidden ${menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                 <div className={`absolute inset-0 transform transition-transform duration-300 ease-in-out ${menuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                    <div className="flex justify-end p-5">
                        <button onClick={() => setMenuOpen(false)} className="text-white p-2 rounded-md">
                            <X size={32} />
                        </button>
                    </div>
                    <div className="flex flex-col justify-between h-[calc(100vh-80px)]">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                            {navLinks.map((link) => {
                                const isActive = activePage === link.page;
                                return (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavClick(link.page)}
                                    className={`flex items-center justify-center w-full text-2xl font-medium py-4 rounded-md transition-colors duration-300 
                                    ${isActive
                                        ? 'text-white bg-gray-900'
                                        : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {link.icon}
                                    {link.title}
                                </button>
                                );
                            })}
                        </div>
                        <div className="pt-4 pb-3 border-t border-gray-700">
                            <div className="flex items-center px-5">
                                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center text-black font-bold">
                                    {userInitial}
                                </div>
                                <div className="ml-3">
                                    <div className="text-base font-medium text-white">{userName}</div>
                                    <div className="text-sm font-medium text-gray-400">{userEmail}</div>
                                </div>
                            </div>
                            <div className="mt-3 px-2 space-y-1">
                                <button onClick={handleLogoutClick} className="flex items-center w-full px-3 py-3 rounded-md text-base font-medium text-gray-400 hover:text-white hover:bg-gray-700">
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DashboardNav;