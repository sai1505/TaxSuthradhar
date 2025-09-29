import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const UserDashboardNavbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Close menu on navigation
    const handleLinkClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    // Placeholder for sign-out logic
    const handleSignOut = () => {
        console.log("User signed out");
        handleLinkClick();
        // Add your sign-out logic here (e.g., clear tokens, call API)
        navigate('/signin'); // Redirect to sign-in page after sign-out
    };

    // Define dashboard navigation items
    const navItems = [
        { label: 'New Chat', path: '/dashboard/new-chat' },
        { label: 'History', path: '/dashboard/history' },
        { label: 'Documents', path: '/dashboard/documents' },
        { label: 'Profile', path: '/dashboard/profile' }
    ];

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/20 shadow-lg">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <Link
                                to="/dashboard" // Link to the main dashboard page
                                className="text-white text-2xl font-bold transition-all duration-300 hover:text-gray-200 hover:tracking-wider animate-fadeIn"
                                onClick={handleLinkClick}
                            >
                                Tax Suthradhar
                            </Link>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-4">
                            {navItems.map((item) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    // --- MODIFIED THIS LINE ---
                                    // Removed the active link logic to revert to hover-only animation
                                    className="nav-link text-gray-300 hover:text-white px-3 py-2 text-sm font-medium relative"
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <button
                                onClick={handleSignOut}
                                className="bg-white text-black px-4 py-2 rounded-md text-sm font-medium hover:bg-white transition-all duration-300 transform hover:scale-105"
                            >
                                Sign Out
                            </button>
                        </div>

                        {/* Mobile Menu Button */}
                        <div className="md:hidden">
                            <button
                                onClick={toggleMenu}
                                className="hamburger-button"
                                aria-label="Toggle menu"
                                aria-expanded={isMenuOpen}
                            >
                                <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                                <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                                <span className={`hamburger-line ${isMenuOpen ? 'open' : ''}`}></span>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {isMenuOpen && (
                    <div className="md:hidden bg-black/95 backdrop-blur-lg animate-slideIn">
                        <div className="px-2 pt-2 pb-8 space-y-1 sm:px-3">
                            {navItems.map((item, index) => (
                                <Link
                                    key={item.label}
                                    to={item.path}
                                    onClick={handleLinkClick}
                                    className={`mobile-nav-item block px-3 py-3 text-base font-medium rounded-md ${location.pathname === item.path
                                        ? 'bg-white/20 text-white' // Active style for mobile is fine, as it's a background change
                                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                                        }`}
                                    style={{ animationDelay: `${index * 100}ms` }}
                                >
                                    {item.label}
                                </Link>
                            ))}
                            <div className="border-t border-white/20 pt-4 mt-4">
                                <button
                                    onClick={handleSignOut}
                                    className="mobile-nav-item block w-full text-center bg-white/10 text-white px-4 py-3 rounded-md text-base font-medium hover:bg-white/20 transition-colors duration-300"
                                    style={{ animationDelay: `${navItems.length * 100}ms` }}
                                >
                                    Sign Out
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </nav>
            <style>
                {`
                /* General Animations */
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.75s ease-in-out forwards;
                }
                
                @keyframes slideIn {
                    from { opacity: 0; transform: translateY(-10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-slideIn {
                    animation: slideIn 0.3s ease-out forwards;
                }

                /* Desktop Nav Link Underline Effect */
                .nav-link::after {
                    content: '';
                    position: absolute;
                    width: 100%;
                    transform: scaleX(0);
                    height: 2px;
                    bottom: 0;
                    left: 0;
                    background-color: white;
                    transform-origin: bottom right;
                    transition: transform 0.25s ease-out;
                }
                .nav-link:hover::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }

                /* --- REMOVED THIS SECTION --- */
                /* No longer keeping the underline visible for the active link */
                /*
                .nav-link[class*="text-white"]::after {
                    transform: scaleX(1);
                    transform-origin: bottom left;
                }
                */
                /* --- END OF REMOVED SECTION --- */


                /* Mobile Menu Button (Hamburger to X) */
                .hamburger-button {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-around;
                    width: 2rem;
                    height: 2rem;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    padding: 0;
                    z-index: 10;
                }
                .hamburger-line {
                    width: 2rem;
                    height: 0.15rem;
                    background: white;
                    border-radius: 10px;
                    transition: all 0.3s linear;
                    position: relative;
                    transform-origin: 1px;
                }
                .hamburger-line.open:nth-child(1) {
                    transform: rotate(45deg);
                }
                .hamburger-line.open:nth-child(2) {
                    opacity: 0;
                    transform: translateX(20px);
                }
                .hamburger-line.open:nth-child(3) {
                    transform: rotate(-45deg);
                }
                
                /* Staggered Animation for Mobile Nav Items */
                .mobile-nav-item {
                    opacity: 0;
                    transform: translateY(-10px);
                    animation: slideIn 0.5s ease-out forwards;
                }
                `}
            </style>
        </>
    );
};

export default UserDashboardNavbar;
