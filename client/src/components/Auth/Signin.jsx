import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// NEW: 2D Animation for the Sign-in Page
const SignInVisualAnimation = () => (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <svg className="w-full max-w-xs" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Lock Body */}
            <rect x="65" y="90" width="70" height="60" rx="5" fill="none" stroke="white" strokeWidth="2" className="draw-outline" />

            {/* Lock Shackle */}
            <path
                d="M100 90 V50 A35 35 0 0 1 135 15 A35 35 0 0 1 170 50 V90"
                fill="none"
                stroke="white"
                strokeWidth="2"
                className="draw-outline shackle"
                style={{ animationDelay: '0.5s' }}
            />

            {/* Key */}
            <g className="key-group">
                <circle cx="30" cy="115" r="12" fill="none" stroke="white" strokeWidth="2" />
                <path d="M42 115 H80 V110 H85 V120 H80" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </g>
        </svg>
    </div>
);


const Signin = () => {
    // State to hold email and password input data
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignin = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }
        alert(`Signing in with:\nEmail: ${email}`);
        // Reset fields after submission
        setEmail('');
        setPassword('');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-center p-4">
            <style>
                {`
                /* NEW animations for the sign-in visual */
                @keyframes draw {
                    to { stroke-dashoffset: 0; }
                }
                .draw-outline {
                    stroke-dasharray: 500;
                    stroke-dashoffset: 500;
                    animation: draw 1.5s ease-out forwards;
                }

                @keyframes slideInAndTurn {
                    0% { transform: translateX(-100px); opacity: 0; }
                    50% { transform: translateX(0); opacity: 1; }
                    70% { transform: translateX(0) rotate(0deg); }
                    100% { transform: translateX(0) rotate(90deg); }
                }
                .key-group {
                    opacity: 0;
                    transform-origin: 80px 115px; /* Set rotation origin to the key tip */
                    animation: slideInAndTurn 3s ease-in-out forwards 1.5s;
                }

                @keyframes unlock {
                    to { transform: translateY(-10px); }
                }
                .shackle {
                    animation-delay: 4s;
                    animation: draw 1s ease-out forwards 0.5s, unlock 0.5s ease-out forwards 4s;
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

            {/* Left side with the animation */}
            <SignInVisualAnimation />

            {/* Right side with the form */}
            <div className="w-full max-w-md bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10 text-center animate-fadeInUp relative z-10">
                <h1 className="text-3xl font-bold mb-4 text-white">Welcome Back</h1>
                <p className="text-white/80 mb-8">Enter your credentials to access your account.</p>

                {/* Google Sign-in Button */}
                <button
                    className="w-full flex items-center justify-center px-6 py-3 border border-white text-white rounded-md text-lg font-semibold hover:bg-white hover:text-black transition-colors duration-300 transform hover:scale-105 mb-6"
                    onClick={() => alert('Initiating Google Sign-in... (Not functional in demo)')}
                >
                    <img src="https://www.svgrepo.com/show/355037/google.svg" alt="Google logo" className="w-6 h-6 mr-3" />
                    Sign in with Google
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
                <form onSubmit={handleSignin} className="space-y-6">
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
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white placeholder-white/50 focus:outline-none focus:ring-1 focus:ring-white transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-white text-black px-6 py-3 rounded-md text-lg font-bold hover:bg-gray-200 transition-all duration-300 transform hover:scale-105"
                    >
                        Sign In
                    </button>
                </form>

                <p className="text-white/80 mt-8">
                    Don't have an account? <Link to="/signup" className="text-white font-medium hover:underline">Sign Up</Link>
                </p>
            </div>

        </div>
    );
};

export default Signin;