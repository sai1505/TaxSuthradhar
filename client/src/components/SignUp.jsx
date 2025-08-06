import React, { useState, useEffect } from 'react';
import { Mail, Lock, CheckCircle, XCircle, X } from 'lucide-react';

const SignUp = ({ onNavigate }) => {
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const [notification, setNotification] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (notification) {
            const timer = setTimeout(() => setNotification(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [notification]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setNotification(null);
        if (formData.password !== formData.confirmPassword) {
            setNotification({ message: 'Passwords do not match.', type: 'error' });
            return;
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5000/api/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: formData.email, password: formData.password }),
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.message || 'An unknown error occurred.');
            setNotification({ message: `Account created for ${data.user.email}`, type: 'success' });
            setFormData({ email: '', password: '', confirmPassword: '' });
        } catch (error) {
            setNotification({ message: error.message, type: 'error' });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <div className="flex justify-center items-center min-h-full py-12 px-4 sm:px-6 lg:px-8">
                <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
                    <div className="hidden md:block text-left">
                        <h1 className="text-4xl font-bold text-white">Get started with the system.</h1>
                        <p className="mt-4 text-gray-400 text-lg">Create an account to access our intelligent tax automation platform.</p>
                        <ul className="mt-6 space-y-3 text-gray-300">
                            <li className="flex items-start"><span className="text-white mr-2">&#10003;</span><span>Securely upload and let us scrape your financial documents.</span></li>
                            <li className="flex items-start"><span className="text-white mr-2">&#10003;</span><span>Receive a clear, automated analysis of your tax liabilities.</span></li>
                            <li className="flex items-start"><span className="text-white mr-2">&#10003;</span><span>Discover legal strategies to optimize and save on your taxes.</span></li>
                        </ul>
                    </div>
                    <div className="w-full max-w-md space-y-8 p-8 border border-gray-800 rounded-lg bg-black">
                        <div><h2 className="text-center text-3xl font-extrabold text-white">Create your account</h2></div>

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Mail className="h-5 w-5 text-gray-500" /></div><input name="email" type="email" required className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm" placeholder="Email address" value={formData.email} onChange={handleChange} /></div>
                            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-500" /></div><input name="password" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm" placeholder="Password" value={formData.password} onChange={handleChange} /></div>
                            <div className="relative"><div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Lock className="h-5 w-5 text-gray-500" /></div><input name="confirmPassword" type="password" required className="appearance-none rounded-md relative block w-full px-3 py-3 pl-10 border border-gray-700 bg-black placeholder-gray-500 text-white focus:outline-none focus:ring-white focus:border-white focus:z-10 sm:text-sm" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} /></div>
                            <div><button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-black bg-white hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 disabled:bg-gray-400">{isSubmitting ? 'Creating...' : 'Create Account'}</button></div>
                        </form>
                        <p className="text-center text-sm text-gray-500">Already have an account?{' '}<button onClick={() => onNavigate('signin')} className="font-medium text-white hover:text-gray-300">Sign In</button></p>
                    </div>
                </div>
            </div>
            {notification && (
                <div className={`fixed bottom-5 right-5 flex items-center p-4 border border-gray-800 rounded-lg shadow-lg bg-black text-white transition-all duration-300 animate-slide-in`}>
                    {notification.type === 'success' ? <CheckCircle className="w-6 h-6 text-green-500 mr-3" /> : <XCircle className="w-6 h-6 text-red-500 mr-3" />}
                    <span>{notification.message}</span>
                    <button onClick={() => setNotification(null)} className="ml-4 text-gray-500 hover:text-white"><X size={20} /></button>
                </div>
            )}
        </>
    );
};

export default SignUp;
