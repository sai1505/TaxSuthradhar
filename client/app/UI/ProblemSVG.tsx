
export default function ProblemSVG() {
    return (
        <svg viewBox="0 0 520 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <filter id="blur-payslip">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" />
                </filter>
                <filter id="redglow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <linearGradient id="confuseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef2f2" />
                    <stop offset="100%" stopColor="#fff7ed" />
                </linearGradient>
            </defs>

            {/* ── Blurry Payslip ── */}
            <rect x="30" y="40" width="180" height="260" rx="14" fill="white" stroke="#fca5a5" strokeWidth="2" className="dark:fill-[#1a1a2e] dark:stroke-red-900" />
            {/* Blurred content lines */}
            <g filter="url(#blur-payslip)" opacity="0.6">
                <rect x="48" y="62" width="100" height="8" rx="4" fill="#94a3b8" />
                <rect x="48" y="80" width="130" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="97" width="110" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="114" width="120" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="131" width="90" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="148" width="140" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="165" width="100" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="182" width="120" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="199" width="85" height="7" rx="3" fill="#94a3b8" />
                <rect x="48" y="220" width="145" height="10" rx="4" fill="#f59e0b" opacity="0.5" />
                <rect x="48" y="240" width="130" height="7" rx="3" fill="#cbd5e1" />
                <rect x="48" y="260" width="110" height="7" rx="3" fill="#cbd5e1" />
            </g>
            {/* Question marks overlay */}
            <text x="85" y="170" fontSize="36" opacity="0.15" fill="#ef4444">???</text>
            <text x="60" y="95" fontSize="14" fill="#ef4444" opacity="0.7" fontWeight="700">?</text>
            <text x="160" y="140" fontSize="14" fill="#ef4444" opacity="0.7" fontWeight="700">?</text>
            <text x="120" y="240" fontSize="14" fill="#ef4444" opacity="0.7" fontWeight="700">?</text>

            {/* ── Magnifying glass ── */}
            <circle cx="162" cy="200" r="55" fill="none" stroke="#f59e0b" strokeWidth="3.5" opacity="0.7" filter="url(#redglow)" />
            <line x1="203" y1="242" x2="228" y2="267" stroke="#f59e0b" strokeWidth="5" strokeLinecap="round" />

            {/* ── Confused employee ── */}
            {/* Body */}
            <rect x="310" y="170" width="60" height="80" rx="10" fill="#dbeafe" stroke="#93c5fd" strokeWidth="1.5" className="dark:fill-[#1e3a5f] dark:stroke-blue-700" />
            {/* Head */}
            <circle cx="340" cy="145" r="30" fill="#fde68a" stroke="#fbbf24" strokeWidth="1.5" />
            {/* Eyes - worried */}
            <ellipse cx="330" cy="140" rx="4" ry="5" fill="#1e293b" />
            <ellipse cx="350" cy="140" rx="4" ry="5" fill="#1e293b" />
            {/* Sweat drop */}
            <ellipse cx="364" cy="128" rx="5" ry="7" fill="#60a5fa" opacity="0.8" />
            {/* Frown */}
            <path d="M328,158 Q340,151 352,158" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Eyebrows worried */}
            <path d="M326,132 Q330,128 334,132" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
            <path d="M346,132 Q350,128 354,132" stroke="#92400e" strokeWidth="2" fill="none" strokeLinecap="round" />
            {/* Arms reaching toward payslip */}
            <line x1="310" y1="200" x2="270" y2="220" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" className="dark:stroke-blue-700" />
            <line x1="370" y1="200" x2="400" y2="215" stroke="#93c5fd" strokeWidth="6" strokeLinecap="round" className="dark:stroke-blue-700" />

            {/* ── Jargon bubbles ── */}
            {[
                { x: 285, y: 60, text: "80C?" },
                { x: 390, y: 80, text: "10(14)?" },
                { x: 415, y: 130, text: "24(b)?" },
                { x: 385, y: 310, text: "ITR-1 or ITR-2?" },
                { x: 240, y: 320, text: "TDS why?" },
            ].map(({ x, y, text }) => (
                <g key={text}>
                    <rect x={x - 4} y={y - 16} width={text.length * 7.5 + 8} height={22} rx="11" fill="#fef2f2" stroke="#fca5a5" strokeWidth="1.5" className="dark:fill-red-950/60 dark:stroke-red-800" />
                    <text x={x + (text.length * 7.5 + 8) / 2 - 4} y={y} textAnchor="middle" fontSize="10" fontWeight="700" fill="#ef4444">{text}</text>
                </g>
            ))}
        </svg>
    );
}