export default function SignUpIllustration() {
    return (
        <svg viewBox="0 0 460 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="sg1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="sg2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <filter id="sglow">
                    <feGaussianBlur stdDeviation="6" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="orb1" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.18" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background orb */}
            <ellipse cx="230" cy="280" rx="200" ry="240" fill="url(#orb1)" />

            {/* Central document card */}
            <rect x="100" y="140" width="260" height="320" rx="20" fill="white"
                stroke="#f59e0b" strokeWidth="1.5" filter="url(#sglow)"
                className="dark:fill-[#111827]" />

            {/* Card header */}
            <rect x="100" y="140" width="260" height="52" rx="20" fill="url(#sg1)" />
            <rect x="100" y="167" width="260" height="25" fill="url(#sg1)" />
            <text x="230" y="170" textAnchor="middle" fontSize="13" fontWeight="800" fill="white" letterSpacing="1">TAX SUTHRADHAR</text>
            <text x="230" y="184" textAnchor="middle" fontSize="9" fill="white" opacity="0.8">Your Financial Companion</text>

            {/* Profile avatar ring */}
            <circle cx="230" cy="230" r="34" fill="url(#sg2)" stroke="url(#sg1)" strokeWidth="2" className="dark:fill-[#1e2d4a]">
                <animate attributeName="r" values="34;37;34" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="230" y="240" textAnchor="middle" fontSize="28">🧑‍💼</text>

            {/* Form field mockups */}
            {[
                { y: 278, icon: "👤", label: "Display Name", val: "Arjun Sharma" },
                { y: 318, icon: "📧", label: "Email", val: "arjun@company.in" },
                { y: 358, icon: "🔐", label: "Password", val: "••••••••••••" },
            ].map(({ y, icon, label, val }) => (
                <g key={label}>
                    <rect x="120" y={y} width="220" height="30" rx="8"
                        fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"
                        className="dark:fill-[#1e293b] dark:stroke-slate-700" />
                    <text x="134" y={y + 19} fontSize="10">{icon}</text>
                    <text x="150" y={y + 19} fontSize="8.5" fill="#94a3b8">{label}:</text>
                    <text x="205" y={y + 19} fontSize="9" fontWeight="600" fill="#f59e0b">{val}</text>
                </g>
            ))}

            {/* Strength bar */}
            <rect x="120" y="402" width="220" height="6" rx="3" fill="#e2e8f0" className="dark:fill-[#1e293b]" />
            <rect x="120" y="402" width="176" height="6" rx="3" fill="#10b981" />
            <text x="120" y="420" fontSize="8.5" fill="#10b981" fontWeight="700">● Excellent Strength</text>

            {/* Submit button mockup */}
            <rect x="120" y="432" width="220" height="32" rx="16" fill="url(#sg1)" filter="url(#sglow)" />
            <text x="230" y="452" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">Create Account →</text>

            {/* Compliance badge */}
            <rect x="145" y="478" width="170" height="24" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1" className="dark:fill-[#0d2b1f] dark:stroke-emerald-800" />
            <text x="230" y="493" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#059669">🔒 DPDP Act 2026 Compliant</text>

            {/* Floating thread accent */}
            <path d="M60,200 Q100,160 140,190 Q180,220 140,260" stroke="url(#sg1)"
                strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="-20" dur="1.5s" repeatCount="indefinite" />
            </path>
            <path d="M320,180 Q370,155 390,200 Q410,245 370,270" stroke="url(#sg1)"
                strokeWidth="2.5" fill="none" strokeDasharray="6 4" opacity="0.5">
                <animate attributeName="stroke-dashoffset" from="0" to="20" dur="1.8s" repeatCount="indefinite" />
            </path>

            {/* Top corner dots */}
            {[60, 90, 120].map((x, i) => (
                <circle key={i} cx={x} cy="90" r="4" fill="#f59e0b" opacity={0.3 + i * 0.2}>
                    <animate attributeName="opacity" values={`${0.3 + i * 0.2};0.8;${0.3 + i * 0.2}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
            ))}
            {[340, 370, 400].map((x, i) => (
                <circle key={i} cx={x} cy="480" r="4" fill="#f97316" opacity={0.3 + i * 0.2}>
                    <animate attributeName="opacity" values={`${0.3 + i * 0.2};0.8;${0.3 + i * 0.2}`} dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
    );
}