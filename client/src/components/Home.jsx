import React from 'react';
import { UploadCloud, BarChart, ShieldCheck, Zap, Users, Target, Lock, Clock, TrendingUp } from 'lucide-react';

// A reusable card component for a consistent "paper-like" look
const FeatureCard = ({ icon, title, children }) => (
    <div className="border border-gray-800 p-6 rounded-lg bg-black hover:bg-gray-900 transition-colors duration-300 transform hover:-translate-y-1">
        <div className="flex items-center space-x-4 mb-4">
            <div className="bg-gray-800 p-3 rounded-full">
                {icon}
            </div>
            <h3 className="text-xl font-semibold text-white">{title}</h3>
        </div>
        <p className="text-gray-400">{children}</p>
    </div>
);

// The Home component now accepts the onNavigate function as a prop
const Home = ({ onNavigate }) => {
    return (
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-20 animate-fadeIn">

            {/* --- INTRO SECTION --- */}
            <section className="text-center">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
                    Navigate Your Taxes with Intelligent Automation.
                </h1>
                <p className="max-w-3xl mx-auto mt-6 text-lg md:text-xl text-gray-400">
                    Tax Suthradhar is your dedicated narrator for the complex story of IT-sector taxation. We transform your financial documents into a clear, actionable plan, helping you understand your liabilities and legally optimize your savings.
                </p>
            </section>

            {/* --- KEY FEATURES SECTION --- */}
            <section className="mt-20 md:mt-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">How It Works</h2>
                    <p className="text-gray-500 mt-2">A simple, three-step process to financial clarity.</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <FeatureCard icon={<UploadCloud size={24} className="text-white" />} title="1. Submit Documents">
                        Securely upload your financial statements, such as Form 16 or profit/loss reports. Our system intelligently scrapes and organizes the necessary data.
                    </FeatureCard>
                    <FeatureCard icon={<BarChart size={24} className="text-white" />} title="2. Analyze Liability">
                        We process your information to provide a clear analysis of your tax obligations, showing you exactly what you owe and why.
                    </FeatureCard>
                    <FeatureCard icon={<ShieldCheck size={24} className="text-white" />} title="3. Optimize Savings">
                        Discover all the legal avenues for tax reduction. We highlight deductions and exemptions you might be missing, maximizing your returns.
                    </FeatureCard>
                </div>
            </section>

            {/* --- WHY CHOOSE US SECTION (Elaborated Content) --- */}
            <section className="mt-20 md:mt-32">
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">Why Tax Suthradhar?</h2>
                    <p className="text-gray-500 mt-2">The modern advantage for your financial health.</p>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    <FeatureCard icon={<Lock size={24} className="text-white" />} title="Bank-Grade Security">
                        Your data's privacy is our top priority. We use end-to-end encryption to ensure your financial information is always protected.
                    </FeatureCard>
                    <FeatureCard icon={<TrendingUp size={24} className="text-white" />} title="Maximize Your Returns">
                        Our intelligent system identifies every possible legal deduction and credit, ensuring you never overpay by a single rupee.
                    </FeatureCard>
                    <FeatureCard icon={<Clock size={24} className="text-white" />} title="Save Precious Time">
                        Forget hours of manual data entry and complex calculations. Our automated process turns a multi-day task into a matter of minutes.
                    </FeatureCard>
                    <FeatureCard icon={<Users size={24} className="text-white" />} title="Built for the IT Sector">
                        We specialize in the unique financial landscape of tech professionals and startups, from ESOPs to foreign income.
                    </FeatureCard>
                </div>
            </section>

            {/* --- THE IMPACT & TARGET USERS SECTION --- */}
            <section className="mt-20 md:mt-32 grid md:grid-cols-2 gap-16 items-center">
                <div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">The Suthradhar Impact</h2>
                    <p className="text-gray-400 text-lg mb-6">
                        Our goal is to demystify taxes for the tech industry. By automating the most tedious parts of tax preparation, we empower you to make smarter financial decisions, save valuable time, and eliminate the stress of compliance. Stop overpaying and start optimizing.
                    </p>
                </div>
                <div className="border border-gray-800 p-8 rounded-lg">
                    <div className="flex items-center space-x-4 mb-4">
                        <Target size={28} className="text-white" />
                        <h3 className="text-2xl font-semibold text-white">Who We Serve</h3>
                    </div>
                    <ul className="space-y-3 text-gray-400">
                        <li className="flex items-center space-x-3">
                            <Users size={20} />
                            <span>IT Professionals & Salaried Employees</span>
                        </li>
                        <li className="flex items-center space-x-3">
                            <Zap size={20} />
                            <span>Tech Startups & Small Businesses</span>
                        </li>
                    </ul>
                </div>
            </section>

            {/* --- CALL TO ACTION (New Section) --- */}
            <section className="mt-20 md:mt-32 text-center border-t border-gray-800 pt-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white">Ready to Simplify Your Taxes?</h2>
                <p className="max-w-2xl mx-auto mt-4 text-gray-400">
                    Create your account in seconds and take the first step towards financial clarity and peace of mind.
                </p>
                <div className="mt-8">
                    <button
                        onClick={() => onNavigate('signup')}
                        className="bg-white text-black font-bold text-lg px-8 py-3 rounded-md hover:bg-gray-200 transition-transform duration-300 hover:scale-105"
                    >
                        Create Your Free Account
                    </button>
                </div>
            </section>

            {/* We can add a CSS animation for the fade-in effect */}
            <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.8s ease-in-out forwards;
        }
      `}</style>
        </div>
    );
};

export default Home;
