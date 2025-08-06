import React, { useEffect } from 'react';
import DashboardNav from './components/DashboardNav';
import Footer from './components/Footer';
import { BookOpen, Clock } from 'lucide-react';

// This component receives 'user' and 'onLogout' from App.jsx
const Dashboard = ({ user, onLogout }) => {

    useEffect(() => {
        // Set a class on the root element for dashboard-specific styles if needed
        document.documentElement.classList.add('dashboard-view');
        // Cleanup on unmount
        return () => {
            document.documentElement.classList.remove('dashboard-view');
        };
    }, []);

    return (
        <div className="flex flex-col min-h-screen bg-gray-900">
            {/* It then passes 'user' and 'onLogout' down to DashboardNav */}
            <DashboardNav user={user} onLogout={onLogout} />

            <main className="flex-grow">
                <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                    <div className="pb-5 border-b border-gray-700 mb-8">
                        <h1 className="text-3xl font-bold leading-tight text-white">
                            Dashboard
                        </h1>
                        <p className="mt-2 text-lg text-gray-400">
                            Welcome back, {user?.name || user?.email}! Here's a summary of your account.
                        </p>
                    </div>

                    {/* Main content grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1: Recent Activity */}
                        <div className="bg-black rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Recent Activity</h3>
                            <ul className="space-y-4 text-gray-300">
                                <li className="flex items-center"><BookOpen className="h-5 w-5 mr-3 text-blue-400" /> Document "Q4_Report.pdf" uploaded.</li>
                                <li className="flex items-center"><Clock className="h-5 w-5 mr-3 text-green-400" /> Analysis complete for "Tax_2023.csv".</li>
                                <li className="flex items-center"><BookOpen className="h-5 w-5 mr-3 text-blue-400" /> Document "Invoice_123.pdf" added.</li>
                            </ul>
                        </div>

                        {/* Card 2: Quick Actions */}
                        <div className="bg-black rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
                            <div className="flex flex-col space-y-3">
                                <button className="w-full text-left bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    Upload New Document
                                </button>
                                <button className="w-full text-left bg-gray-700 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                    View Full History
                                </button>
                            </div>
                        </div>

                        {/* Card 3: Account Status */}
                        <div className="bg-black rounded-lg shadow-lg p-6">
                            <h3 className="text-xl font-semibold text-white mb-4">Account Status</h3>
                            <div className="space-y-3 text-gray-300">
                                <p><strong>Plan:</strong> Premium</p>
                                <p><strong>Documents Analyzed:</strong> 42</p>
                                <p><strong>Member Since:</strong> Jan 1, 2023</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
};

export default Dashboard;
