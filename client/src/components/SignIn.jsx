import React, { useState } from 'react';
import { Mail, Lock } from 'lucide-react';

// A simple SVG for the Google icon
const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039L38.804 9.81C34.553 5.822 29.582 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"></path>
        <path fill="#FF3D00" d="M6.306 14.691c-1.222 2.18-1.996 4.674-1.996 7.309c0 2.635.774 5.129 1.996 7.309l-5.34 4.14C.646 30.223 0 27.222 0 24c0-3.222.646-6.223 1.966-8.859l5.34 4.14z"></path>
        <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238c-2.008 1.32-4.402 2.108-7.219 2.108c-5.22 0-9.651-3.344-11.303-7.961l-6.463 5.045C7.186 38.331 14.897 44 24 44z"></path>
        <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l6.19 5.238C42.012 36.417 44 30.686 44 24c0-1.341-.138-2.65-.389-3.917z"></path>
    </svg>
);

// The SignIn component now accepts onNavigate to switch to the SignUp page
const SignIn = ({ onNavigate }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [statusMessage, setStatusMessage] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatusMessage('');
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/signin', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'Login failed.');
            setStatusMessage(`Success! Welcome back, ${data.user.email}.`);
        } catch (error) {
            setStatusMessage(`Error: ${error.message}`);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleGoogleSignIn = () => {
        console.log("Attempting Google Sign-In...");
        setStatusMessage("Google Sign-In is not yet implemented.");
    };

    return (
        <div className="flex justify-center items-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">

                {/* Left Column: Informational Text */}
                <div className="hidden md:block text-left">
                    <h1 className="text-4xl font-bold text-white">Welcome Back.</h1>
                    <p className="mt-4 text-gray-400 text-lg">
                        Sign in to continue managing your tax automation and optimization.
                    </p>
                    <div className="mt-6 border-t border-gray-800 pt-6">
                        <p className="text-gray-300">
                            Access your dashboard to view past analyses, upload new documents, and stay on top of your financial health.
                        </p>
                    </div>
                </div>

                {/* Right Column: Sign-In Form */}
                <div className="w-full max-w-md space-y-8 p-8 border border-gray-800 rounded-lg bg-black">
                    <div>
                        <h2 className="text-center text-3xl font-extrabold text-white">
                            Sign in to your account
                        </h2>
                    </div>

                    <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex justify-center items-center py-2 px-4 border border-gray-700 rounded-md shadow-sm bg-black text-sm font-medium text-white hover:bg-gray-900 transition-colors"
                    >
                        <GoogleIcon />
                        Sign in with Google
                    </button>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-700"></div></div>
                        <div className="relative flex justify-center text-sm"><span className="px-2 bg-black text-gray-500">Or continue with email</span></div>
                    </div>

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-500" /></div>
                            <input name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} />
                        </div>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-500" /></div>
                            <input name="password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} />
                        </div>

                        {statusMessage && <p className={`text-center text-sm ${statusMessage.startsWith('Error') ? 'text-red-500' : 'text-green-500'}`}>{statusMessage}</p>}

                        <div>
                            <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400">
                                {isSubmitting ? 'Signing In...' : 'Sign In'}
                            </button>
                        </div>
                    </form>

                    <p className="text-center text-sm text-gray-500">
                        Don't have an account?{' '}
                        <button onClick={() => onNavigate('signup')} className="font-medium text-white hover:text-gray-300">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
