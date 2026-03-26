export default function SignInIllustration() {
    return (
        <svg viewBox="0 0 460 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="ig1" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="ig2" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ecfdf5" />
                    <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
                <filter id="iglow">
                    <feGaussianBlur stdDeviation="7" result="b" />
                    <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="iorb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f97316" stopOpacity="0.15" />
                    <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* Background glow */}
            <ellipse cx="230" cy="290" rx="210" ry="230" fill="url(#iorb)" />

            {/* Lock vault - central element */}
            <rect x="120" y="160" width="220" height="240" rx="22" fill="white"
                stroke="url(#ig1)" strokeWidth="2" filter="url(#iglow)"
                className="dark:fill-[#111827]" />

            {/* Vault door top arch */}
            <rect x="120" y="160" width="220" height="50" rx="22" fill="url(#ig1)" />
            <rect x="120" y="186" width="220" height="24" fill="url(#ig1)" />
            <text x="230" y="177" textAnchor="middle" fontSize="11" fontWeight="800" fill="white" letterSpacing="1.5">SECURE LOGIN</text>
            <text x="230" y="192" textAnchor="middle" fontSize="8.5" fill="white" opacity="0.75">Tax Suthradhar Portal</text>

            {/* Big lock icon in center */}
            <circle cx="230" cy="265" r="42" fill="#fef3c7" stroke="url(#ig1)" strokeWidth="2.5"
                className="dark:fill-[#1e2d4a]">
                <animate attributeName="r" values="42;45;42" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <text x="230" y="280" textAnchor="middle" fontSize="36">🔓</text>

            {/* Key slots (input fields) */}
            {[
                { y: 322, icon: "📧", label: "email@company.in", w: 160 },
                { y: 358, icon: "🔑", label: "••••••••••••", w: 140 },
            ].map(({ y, icon, label, w }) => (
                <g key={y}>
                    <rect x="130" y={y} width="200" height="30" rx="8"
                        fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"
                        className="dark:fill-[#1e293b] dark:stroke-slate-700" />
                    <text x="144" y={y + 19} fontSize="11">{icon}</text>
                    <rect x="162" y={y + 8} width={w} height="14" rx="4"
                        fill="#e2e8f0" opacity="0.5" className="dark:fill-slate-700" />
                    <text x="166" y={y + 19} fontSize="8.5" fill="#94a3b8">{label}</text>
                </g>
            ))}

            {/* Sign in button mockup */}
            <rect x="130" y="400" width="200" height="32" rx="16" fill="url(#ig1)" filter="url(#iglow)" />
            <text x="230" y="420" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">Sign In Securely →</text>

            {/* Security shield badge */}
            <rect x="155" y="447" width="150" height="24" rx="12" fill="#ecfdf5" stroke="#6ee7b7" strokeWidth="1"
                className="dark:fill-[#0d2b1f] dark:stroke-emerald-800" />
            <text x="230" y="462" textAnchor="middle" fontSize="8.5" fontWeight="700" fill="#059669">🛡️ End-to-End Encrypted</text>

            {/* Floating thread — left */}
            <path d="M55,240 Q90,200 125,230 Q155,260 125,300"
                stroke="url(#ig1)" strokeWidth="2.5" fill="none" strokeDasharray="7 4" opacity="0.45">
                <animate attributeName="stroke-dashoffset" from="0" to="-22" dur="1.6s" repeatCount="indefinite" />
            </path>

            {/* Floating thread — right */}
            <path d="M335,210 Q380,180 400,230 Q420,280 375,310"
                stroke="url(#ig1)" strokeWidth="2.5" fill="none" strokeDasharray="7 4" opacity="0.45">
                <animate attributeName="stroke-dashoffset" from="0" to="22" dur="1.9s" repeatCount="indefinite" />
            </path>

            {/* Floating nodes */}
            {[
                { cx: 75, cy: 140, r: 5, delay: "0s" },
                { cx: 105, cy: 110, r: 3.5, delay: "0.6s" },
                { cx: 55, cy: 115, r: 4, delay: "1.1s" },
                { cx: 385, cy: 420, r: 5, delay: "0.3s" },
                { cx: 410, cy: 450, r: 3.5, delay: "0.9s" },
                { cx: 365, cy: 445, r: 4, delay: "1.4s" },
            ].map(({ cx, cy, r, delay }, i) => (
                <circle key={i} cx={cx} cy={cy} r={r} fill="#f59e0b" opacity="0.4">
                    <animate attributeName="opacity" values="0.2;0.7;0.2"
                        dur={`${2 + i * 0.3}s`} begin={delay} repeatCount="indefinite" />
                </circle>
            ))}

            {/* Small payslip hint card (top-left floating) */}
            <rect x="32" y="330" width="75" height="55" rx="8"
                fill="white" stroke="#f59e0b" strokeWidth="1" opacity="0.85"
                className="dark:fill-[#1e2d4a]" />
            <text x="44" y="348" fontSize="8" fill="#94a3b8">Your Analysis</text>
            <text x="44" y="361" fontSize="9" fontWeight="700" fill="#f59e0b">₹4,200</text>
            <text x="44" y="374" fontSize="7.5" fill="#10b981">saved 🎉</text>

            {/* Small ITR hint (bottom-right floating) */}
            <rect x="353" y="330" width="75" height="55" rx="8"
                fill="white" stroke="#10b981" strokeWidth="1" opacity="0.85"
                className="dark:fill-[#0d2b1f]" />
            <text x="365" y="348" fontSize="8" fill="#94a3b8">Your Form</text>
            <text x="365" y="361" fontSize="9" fontWeight="700" fill="#10b981">ITR-1</text>
            <text x="365" y="374" fontSize="7.5" fill="#059669">Ready ✓</text>
        </svg>
    );
}