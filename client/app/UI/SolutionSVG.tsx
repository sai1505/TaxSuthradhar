
export default function SolutionSVG() {
    return (
        <svg viewBox="0 0 520 400" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="scanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="clearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ecfdf5" />
                    <stop offset="100%" stopColor="#d1fae5" />
                </linearGradient>
                <filter id="aiGlow">
                    <feGaussianBlur stdDeviation="5" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <radialGradient id="scanBeam" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
            </defs>

            {/* ── Input PDF (left, slightly blurry) ── */}
            <rect x="18" y="50" width="130" height="180" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-[#1a2035] dark:stroke-slate-700" />
            <rect x="18" y="50" width="130" height="28" rx="10" fill="#94a3b8" />
            <rect x="18" y="65" width="130" height="13" fill="#94a3b8" />
            <text x="83" y="68" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">PDF PAYSLIP</text>
            <g opacity="0.45">
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <rect key={i} x="32" y={92 + i * 16} width={i % 2 === 0 ? 88 : 68} height="7" rx="3.5" fill="#94a3b8" />
                ))}
            </g>
            <text x="83" y="218" textAnchor="middle" fontSize="11" fill="#94a3b8">Unreadable…</text>

            {/* ── AI Scanner (center) ── */}
            {/* Outer ring */}
            <circle cx="260" cy="200" r="68" fill="url(#scanBeam)" />
            <circle cx="260" cy="200" r="58" fill="white" stroke="url(#scanGrad)" strokeWidth="3" filter="url(#aiGlow)" className="dark:fill-[#0d1526]">
                <animate attributeName="r" values="58;62;58" dur="2s" repeatCount="indefinite" />
            </circle>
            {/* Scan lines */}
            <line x1="202" y1="200" x2="318" y2="200" stroke="url(#scanGrad)" strokeWidth="2" opacity="0.5">
                <animate attributeName="y1" values="165;235;165" dur="2s" repeatCount="indefinite" />
                <animate attributeName="y2" values="165;235;165" dur="2s" repeatCount="indefinite" />
            </line>
            {/* Brain emoji */}
            <text x="260" y="195" textAnchor="middle" fontSize="30">🤖</text>
            <text x="260" y="218" textAnchor="middle" fontSize="9" fontWeight="800" fill="url(#scanGrad)" letterSpacing="1.5">AI SCANNER</text>
            {/* Rotating dashes */}
            <circle cx="260" cy="200" r="64" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="10 6" opacity="0.4">
                <animateTransform attributeName="transform" type="rotate" from="0 260 200" to="360 260 200" dur="8s" repeatCount="indefinite" />
            </circle>

            {/* Arrow in */}
            <path d="M155,175 L200,195" stroke="url(#scanGrad)" strokeWidth="2.5" fill="none" strokeLinecap="round" markerEnd="url(#arrowHead)">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
            </path>
            {/* Arrow out */}
            <path d="M320,195 L363,175" stroke="#10b981" strokeWidth="2.5" fill="none" strokeLinecap="round">
                <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" />
            </path>
            <defs>
                <marker id="arrowHead" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6 Z" fill="#f59e0b" />
                </marker>
            </defs>

            {/* ── Output icons (right) ── */}
            <rect x="372" y="50" width="130" height="300" rx="14" fill="url(#clearGrad)" stroke="#6ee7b7" strokeWidth="1.5" className="dark:fill-[#0d2b1f] dark:stroke-emerald-800" />
            <text x="437" y="76" textAnchor="middle" fontSize="10" fontWeight="800" fill="#059669">TRANSPARENT</text>

            {[
                { y: 95, icon: "🏠", label: "HRA", sub: "₹18,000 Tax Free", color: "#059669" },
                { y: 145, icon: "🛡️", label: "TDS", sub: "₹6,240 deducted", color: "#f59e0b" },
                { y: 195, icon: "📋", label: "Section 80C", sub: "₹1.5L limit", color: "#6366f1" },
                { y: 245, icon: "💼", label: "ITR-1", sub: "Your Form ✓", color: "#10b981" },
                { y: 295, icon: "💰", label: "Save ₹4,200", sub: "Opportunity found", color: "#f97316" },
            ].map(({ y, icon, label, sub, color }) => (
                <g key={label}>
                    <rect x="384" y={y} width="106" height="38" rx="9" fill="white" stroke={color} strokeWidth="1.2" opacity="0.85" className="dark:fill-[#0a1f16]" />
                    <text x="396" y={y + 16} fontSize="14">{icon}</text>
                    <text x="415" y={y + 15} fontSize="9" fontWeight="700" fill={color}>{label}</text>
                    <text x="415" y={y + 28} fontSize="8" fill="#94a3b8">{sub}</text>
                </g>
            ))}

            {/* "99% accuracy" badge */}
            <rect x="195" y="288" width="130" height="30" rx="15" fill="url(#scanGrad)" />
            <text x="260" y="308" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">⚡ 99% Accuracy</text>
        </svg>
    );
}