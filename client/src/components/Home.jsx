import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

// --- NEW/UPDATED ANIMATED SVG ICONS ---

// New icon for analysis, replacing the filing icon
const IntelligentAnalysisIcon = () => (
    <svg className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 56V8H40L50 18V56H14Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        <path d="M22 28H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 36H42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 44H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <g className="animate-scan">
            <circle cx="38" cy="30" r="8" stroke="currentColor" strokeWidth="2" />
            <path d="M44 36L50 42" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </g>
    </svg>
);

const RealtimeAlertsIcon = () => (
    <svg className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 54C39.732 54 46 47.732 46 40V28C46 16.9543 39.732 8 32 8C24.268 8 18 16.9543 18 28V40C18 47.732 24.268 54 32 54Z" stroke="currentColor" strokeWidth="2" />
        <path d="M38 54C38 57.3137 35.3137 60 32 60C28.6863 60 26 57.3137 26 54" stroke="currentColor" strokeWidth="2" />
        <path className="animate-ping-slow" d="M32 4V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="animate-ping-slow" style={{ animationDelay: '0.2s' }} d="M50 14L47 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path className="animate-ping-slow" style={{ animationDelay: '0.4s' }} d="M14 14L17 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
);

const SecureVaultIcon = () => (
    <svg className="w-16 h-16 text-white" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="12" y="24" width="40" height="30" rx="4" stroke="currentColor" strokeWidth="2" />
        <path className="animate-lock" d="M20 24V18C20 11.3726 25.3726 6 32 6C38.6274 6 44 11.3726 44 18V24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="39" r="4" fill="currentColor" />
    </svg>
);

// --- NEW 2D ANIMATION VISUALS FOR SERVICES ---

const TaxAdvisoryAnimation = () => (
    <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center p-4 border border-white/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 100" preserveAspectRatio="xMidYMid meet">
            <defs>
                <path id="flowPath" d="M 20 50 C 60 20, 100 80, 140 50" fill="none" />
            </defs>
            <path d="M10 20 H50 V80 H10 Z" fill="none" stroke="white" strokeWidth="1" />
            <text x="15" y="54" fill="white" fontSize="8" fontFamily="monospace">DATA</text>
            <circle r="2.5" fill="white" className="data-dot-1">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 20 50 C 60 20, 100 80, 140 50" />
            </circle>
            <circle r="2.5" fill="white" className="data-dot-2">
                <animateMotion dur="4s" repeatCount="indefinite" path="M 20 50 C 60 20, 100 80, 140 50" />
            </circle>
            <path d="M140 50 L160 50" stroke="white" strokeWidth="1" />
            <text x="165" y="55" fontFamily="monospace" fontSize="12" fill="white" className="animate-pulse">$</text>
            <text x="175" y="55" fontFamily="monospace" fontSize="12" fill="white" className="animate-pulse" style={{ animationDelay: '0.2s' }}>$</text>
        </svg>
    </div>
);

const BusinessComplianceAnimation = () => (
    <div className="w-full h-64 bg-black rounded-lg flex items-center justify-center p-4 border border-white/10 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 200 120" preserveAspectRatio="xMidYMid meet">
            <rect x="50" y="10" width="100" height="100" rx="5" fill="none" stroke="white" strokeWidth="1" />
            <path d="M60 30 H140 M60 40 H140 M60 50 H120 M60 70 H140 M60 80 H140 M60 90 H100" stroke="white" strokeOpacity="0.2" strokeWidth="1" />
            <line x1="50" x2="150" y1="15" y2="15" stroke="white" strokeWidth="2" className="scan-line" />
            <path d="M155 35 l5 5 l10 -10" stroke="white" strokeWidth="1.5" fill="none" className="check-mark" />
            <path d="M155 75 l5 5 l10 -10" stroke="white" strokeWidth="1.5" fill="none" className="check-mark" style={{ animationDelay: '2s' }} />
        </svg>
    </div>
);


const Home = () => {
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-visible');
                }
            });
        }, { threshold: 0.1 });

        const elements = document.querySelectorAll('.animate-on-scroll');
        elements.forEach(el => observer.observe(el));
        return () => elements.forEach(el => observer.unobserve(el));
    }, []);

    const features = [
        {
            icon: <IntelligentAnalysisIcon />,
            title: 'Intelligent Document Analysis',
            description: 'Our AI scans your IT service files to identify potential tax savings, discover legal loopholes, and highlight compliance risks.'
        },
        {
            icon: <RealtimeAlertsIcon />,
            title: 'Proactive Opportunity Alerts',
            description: 'Receive instant notifications about new tax-saving strategies and critical compliance changes relevant to the IT sector.'
        },
        {
            icon: <SecureVaultIcon />,
            title: 'Secure Document Vault',
            description: 'Your financial data is protected with bank-level encryption in a centralized and secure digital vault, accessible anytime.'
        }
    ];

    const services = [
        {
            title: 'Loophole & Savings Discovery',
            description: 'Specifically for IT professionals and firms. Our system analyzes your financial documents to uncover hidden deductions and legal strategies to reduce your tax liability, ensuring you save the maximum amount possible.',
            illustration: <TaxAdvisoryAnimation />
        },
        {
            title: 'IT Compliance Verification',
            description: 'Tax SuthraDhar serves as your automated compliance checker. We verify your documents against the latest IT tax regulations to ensure you are always audit-ready, without preparing or filing anything for you.',
            illustration: <BusinessComplianceAnimation />
        }
    ];

    return (
        <div className="bg-black text-white pt-16">
            <style>
                {`
                .animate-on-scroll { opacity: 0; transform: translateY(30px); transition: opacity 0.6s ease-out, transform 0.6s ease-out; }
                .animate-on-scroll.animate-visible { opacity: 1; transform: translateY(0); }
                
                /* Icon Animations */
                @keyframes scan-move { 0% { transform: translate(0, 0); } 25% { transform: translate(-10px, 10px); } 50% { transform: translate(0, 20px); } 75% { transform: translate(10px, 10px); } 100% { transform: translate(0, 0); } }
                .animate-scan { animation: scan-move 4s ease-in-out infinite; }
                @keyframes ping-wave { 0%, 100% { transform: scale(0.8); opacity: 0; } 50% { opacity: 0.5; } }
                .animate-ping-slow { animation: ping-wave 2s ease-in-out infinite; }
                @keyframes lock-click { 0%, 40% { transform: translateY(0); } 50% { transform: translateY(-4px); } 60%, 100% { transform: translateY(0); } }
                .animate-lock { transform-origin: center bottom; animation: lock-click 0.8s ease-in-out 0.7s; }

                /* Service Visual Animations */
                .data-dot-2 { animation-delay: 2s; }
                @keyframes scan-down { from { transform: translateY(0); } to { transform: translateY(90px); } }
                .scan-line { animation: scan-down 4s linear infinite; }
                @keyframes appear { to { opacity: 1; } }
                .check-mark { opacity: 0; animation: appear 0.5s ease-in forwards; }
                `}
            </style>

            <section id="home" className="min-h-screen flex items-center justify-center text-center bg-black relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,white_50%,transparent_100%)]"></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-4 animate-on-scroll">
                        Tax Suthradhar
                    </h1>
                    <p className="max-w-2xl mx-auto text-lg md:text-xl text-gray-300 mb-8 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                        The AI Tax Analyst for IT Services. We don't file your taxes—we analyze your documents to find legal loopholes and save you money.
                    </p>
                    <a href="#features" className="bg-white text-black px-8 py-3 rounded-md font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 inline-block animate-on-scroll" style={{ transitionDelay: '400ms' }}>
                        See How It Works
                    </a>
                </div>
            </section>

            <section id="features" className="py-20 sm:py-32">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-on-scroll">Your Intelligent Advantage</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-16 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                            Our platform provides a tax analysis experience that is sharp, insightful, and secure.
                        </p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-10">
                        {features.map((feature, index) => (
                            <div
                                key={feature.title}
                                className="bg-black p-8 rounded-xl border border-white/10 text-center flex flex-col items-center hover:border-white/30 hover:bg-white/5 transition-all duration-300 transform hover:-translate-y-2 animate-on-scroll"
                                style={{ transitionDelay: `${200 + index * 150}ms` }}
                            >
                                <div className="mb-6">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                                <p className="text-gray-300 leading-relaxed">{feature.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section id="services" className="py-20 sm:py-32 bg-black">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-4 animate-on-scroll">Core Services</h2>
                        <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-20 animate-on-scroll" style={{ transitionDelay: '200ms' }}>
                            We offer two primary functions designed exclusively for the Indian IT sector.
                        </p>
                    </div>
                    <div className="space-y-24">
                        {services.map((service, index) => (
                            <div
                                key={service.title}
                                className={`grid md:grid-cols-2 gap-12 items-center animate-on-scroll`}
                                style={{ transitionDelay: `${200 + index * 150}ms` }}
                            >
                                <div className={`md:order-${index % 2 === 0 ? '1' : '2'}`}>
                                    <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                                    <p className="text-gray-300 leading-loose">{service.description}</p>
                                </div>
                                <div className={`md:order-${index % 2 === 0 ? '2' : '1'}`}>
                                    {service.illustration}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <div className="w-full flex justify-center">
                <Link
                    to="/signup"
                    className="bg-white text-black px-8 py-3 mb-16 rounded-md font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 inline-block animate-on-scroll"
                    style={{ transitionDelay: '400ms' }}
                >
                    Get Started
                </Link>
            </div>

        </div>
    );
};

export default Home;

