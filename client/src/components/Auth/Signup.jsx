import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from '../../firebase';

// NEW: 2D Animation for the left side of the form
const SignupVisualAnimation = () => (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <svg className="w-full max-w-sm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Document Outline */}
            <path d="M40 10 H130 L160 40 V190 H40 Z" fill="none" stroke="white" strokeWidth="2" className="draw-outline" />

            {/* Document content lines (fading in) */}
            <g className="fade-in" style={{ animationDelay: '1s' }}>
                <path d="M60 70 H140" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M60 90 H140" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M60 110 H110" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M60 130 H140" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M60 150 H120" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
            </g>

            {/* Scanning Line */}
            <line x1="40" x2="160" y1="15" y2="15" stroke="white" strokeWidth="3" className="scan-line" style={{ animationDelay: '1.5s' }} />

            {/* Security Shield (appearing after scan) */}
            <g className="fade-in-scale" style={{ animationDelay: '3.5s' }}>
                <path d="M100 20 L150 50 V110 C150 150 100 180 100 180 C100 180 50 150 50 110 V50 Z"
                    fill="rgba(255, 255, 255, 0.1)" stroke="white" strokeWidth="2" />
                {/* Checkmark inside shield */}
                <path d="M85 105 L98 120 L115 95" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" />
            </g>
        </svg>
    </div>
);

// This component will be our visual pop-up message
const Notification = ({ message, type, onClose }) => {
    const isSuccess = type === 'success';

    return (
        <div
            className={`fixed bottom-10 right-5 flex items-center p-4 w-full max-w-xs text-black bg-white rounded-lg shadow-lg animate-slideIn`}
            role="alert"
        >
            <div className="text-sm font-normal">{message}</div>
            <button
                type="button"
                className="ms-auto -mx-1.5 -my-1.5 rounded-lg p-1.5 inline-flex items-center justify-center h-8 w-8 text-gray-500 hover:text-black hover:bg-gray-100"
                onClick={onClose}
                aria-label="Close"
            >
                <span className="sr-only">Close</span>
                <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                </svg>
            </button>
        </div>
    );
};


const Signup = () => {
    // State to hold email and password input data
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // State for API call status and feedback
    const [isLoading, setIsLoading] = useState(false);
    const [error] = useState(null);
    const [successMessage] = useState(null);
    const [notification, setNotification] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => {
                setNotification(null);
            }, 5000);
            return () => clearTimeout(timer); // Cleanup timer if component unmounts
        }
    }, [notification]);

    // NEW: Handle Google Sign-in
    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            const result = await signInWithPopup(auth, provider);
            // The signed-in user info.
            const user = result.user;
            console.log("Google Sign-In Success:", user);
            alert(`Welcome, ${user.displayName}!`);
            // Redirect user to the dashboard or home page after successful sign-in
            navigate('/dashboard');
        } catch (error) {
            // Handle Errors here.
            console.error("Google Sign-In Error:", error);
            alert(`Error: ${error.message}`);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setNotification(null);

        // Client-side validation
        if (!username || !email || !password || !confirmPassword) {
            setNotification({ message: 'Please fill in all fields.', type: 'error' });
            return;
        }
        if (password !== confirmPassword) {
            setNotification({ message: 'Passwords do not match.', type: 'error' });
            return;
        }

        setIsLoading(true);

        try {
            // API Call to your backend server
            const response = await fetch('http://localhost:3000/api/signup', { // Corrected URL
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Something went wrong.');
            }

            setNotification({ message: 'Account created successfully!', type: 'success' });
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');

        } catch (err) {
            setNotification({ message: err.message, type: 'error' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-center p-4">
            <style>
                {`
                /* NEW animations for the side visual */
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
                .draw-outline {
                    stroke-dasharray: 1000;
                    stroke-dashoffset: 1000;
                    animation: draw 1.5s ease-out forwards;
                }

                .animate-slideIn {
                    animation: slideIn 0.5s ease-out forwards;
                }

                @keyframes fadeIn {
                    to { opacity: 0.7; }
                }
                .fade-in {
                    opacity: 0;
                    animation: fadeIn 1s ease-in forwards;
                }
                
                @keyframes scan {
                    from { transform: translateY(0); }
                    to { transform: translateY(170px); }
                }
                .scan-line {
                     animation: scan 2s ease-in-out forwards;
                }

                @keyframes fadeInScale {
                    from { opacity: 0; transform: scale(0.8); }
                    to { opacity: 1; transform: scale(1); }
                }
                .fade-in-scale {
                    opacity: 0;
                    transform-origin: center;
                    animation: fadeInScale 0.5s ease-out forwards;
                }

                .animate-fadeInUp {
                    opacity: 0;
                    transform: translateY(20px);
                    animation: fadeInUp 0.5s ease-out forwards;
                }
                @keyframes fadeInUp {
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                `}
            </style>

            {/* Render the Notification component when there is a message */}
            {notification && (
                <Notification
                    message={notification.message}
                    type={notification.type}
                    onClose={() => setNotification(null)}
                />
            )}

            {/* Left side with the animation */}
            <SignupVisualAnimation />

            {/* Right side with the form */}
            <div className="w-full max-w-md bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10 text-center animate-fadeInUp relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-white">Join Tax Suthradhar</h1>
                <p className="text-white/80 mb-8">Analyze your IT service taxes with AI. Sign up to get started.</p>

                {/* Google Sign-up Button */}
                <button
                    className="w-full flex items-center justify-center px-6 py-3 border border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 transform hover:scale-105 mb-6"
                    onClick={handleGoogleSignIn}
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google logo" className="w-6 h-6 mr-3" />
                    Sign up with Google
                </button>

                <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-white/20"></div>
                    </div>
                    <div className="relative flex justify-center text-sm">
                        <span className="bg-black px-2 text-white/60">Or</span>
                    </div>
                </div>

                {/* Email and Password Form */}
                <form onSubmit={handleSignup} className="space-y-6">
                    <div>
                        <input
                            type="email"
                            placeholder="Email Address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            required
                        />
                    </div>
                    {/* Feedback Messages */}
                    {error && <p className="text-red-400 text-sm text-left">{error}</p>}
                    {successMessage && <p className="text-green-400 text-sm text-left">{successMessage}</p>}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-white text-black px-6 py-3 rounded-md text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creating Account...' : 'Create Account'}
                    </button>
                </form>

                <p className="text-white/80 mt-8">
                    Already have an account? <Link to="/signin" className="text-white font-medium hover:underline">Sign In</Link>
                </p>
            </div>

        </div>
    );
};

export default Signup;

