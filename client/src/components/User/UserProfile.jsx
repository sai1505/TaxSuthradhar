import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// NEW: 2D Animation for the User Profile
// This animation evokes a sense of user identity, data, and security.
const UserProfileAnimation = () => (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <style>
            {`
/* Keyframes for the new animation */
@keyframes draw {
                    to { stroke - dashoffset: 0; }
}
                .draw - path {
    stroke - dasharray: 1000;
    stroke - dashoffset: 1000;
    animation: draw 2s ease - out forwards;
}
@keyframes fadeIn {
                    to { opacity: 1; }
}
                .fade -in -element {
    opacity: 0;
    animation: fadeIn 1s ease -in forwards;
}
@keyframes pulse - dot {
    0 %, 100 % { transform: scale(0.9); opacity: 0.7; }
    50 % { transform: scale(1.1); opacity: 1; }
}
                .pulsing - dot {
    transform - origin: center;
    animation: pulse - dot 3s ease -in -out infinite;
}
`}
        </style>
        <svg className="w-full max-w-sm" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
            {/* Outer revolving rings */}
            <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255, 255, 255, 0.1)" strokeWidth="1" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="rgba(255, 255, 255, 0.15)" strokeWidth="1" />

            {/* Central User Icon */}
            <g className="fade-in-element" style={{ animationDelay: '0.5s' }}>
                <circle cx="100" cy="85" r="20" fill="none" stroke="white" strokeWidth="2" className="draw-path" />
                <path d="M70 140 Q100 110, 130 140" fill="none" stroke="white" strokeWidth="2" className="draw-path" style={{ animationDelay: '1s' }} />
            </g>

            {/* Orbiting data points */}
            <g transform="rotate(45 100 100)">
                <circle cx="100" cy="20" r="4" fill="white" className="pulsing-dot" style={{ animationDelay: '0s' }} />
            </g>
            <g transform="rotate(-110 100 100)">
                <circle cx="100" cy="40" r="3" fill="white" className="pulsing-dot" style={{ animationDelay: '1s' }} />
            </g>
        </svg>
    </div>
);


const UserProfile = () => {
    const [username, setUsername] = useState('Loading...');
    const [email, setEmail] = useState('Loading...');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // --- apiClient is now integrated inside the UserProfile component ---
    const apiClient = {
        getUserProfile: async (email) => {
            // This function calls your backend to get the user's profile data.
            // It assumes your backend has a POST /api/profile endpoint.
            const response = await fetch(`http://localhost:3000/api/profile`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: email })
            });
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch profile.');
            }
            return response.json();
        }
    };

    useEffect(() => {
        const loggedInUserEmail = sessionStorage.getItem('userEmail');
        if (!loggedInUserEmail) {
            handleSignOut(); // Redirect to signin if no user is logged in
            return;
        }

        const fetchProfile = async () => {
            try {
                const data = await apiClient.getUserProfile(loggedInUserEmail);
                if (data.success) {
                    setUsername(data.user.username);
                    setEmail(data.user.email);
                }
            } catch (err) {
                setError(err.message);
                setUsername('Error');
                setEmail('Error');
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = () => {
        sessionStorage.removeItem('userEmail');
        navigate('/signin');
    };

    return (
        <div className="min-h-screen bg-black text-white flex flex-col lg:flex-row items-center justify-center p-4">
            <style>
                {`
    .animate - fadeInUp {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.5s ease - out forwards;
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
            <UserProfileAnimation />

            {/* Right side with the user data */}
            <div className="w-full max-w-md bg-black/80 backdrop-blur-sm p-8 rounded-lg shadow-xl border border-white/10 animate-fadeInUp">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white">Your Profile</h1>
                    <p className="text-white/80 mt-2">This is your personal account information.</p>
                </div>

                {/* User Data Form */}
                <form className="space-y-6">
                    {/* Username Field (Disabled) */}
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-white/70 mb-2 text-left">Name</label>
                        <input
                            id="username"
                            type="text"
                            value={username}
                            disabled
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white/70 placeholder-white/50 cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-white transition-all"
                        />
                    </div>
                    {/* Email Field (Disabled) */}
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-2 text-left">Email Address</label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            disabled
                            className="w-full px-4 py-3 bg-black border border-white/30 rounded-md text-white/70 placeholder-white/50 cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-white transition-all"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UserProfile;