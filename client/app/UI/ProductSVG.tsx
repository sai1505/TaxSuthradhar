export default function ProductSVG() {
    return (
        <svg viewBox="0 0 520 380" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="cardGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <linearGradient id="cardGradDark" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e2d4a" />
                    <stop offset="100%" stopColor="#162038" />
                </linearGradient>
                <linearGradient id="threadGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
            </defs>

            {/* ── Payslip card (left) ── */}
            <rect x="20" y="60" width="155" height="220" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-[#1e2d4a] dark:stroke-[#334155]" />
            <rect x="20" y="60" width="155" height="36" rx="14" fill="#f59e0b" />
            <rect x="20" y="82" width="155" height="14" fill="#f59e0b" rx="0" />
            <text x="97" y="83" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">PAYSLIP</text>
            {/* Payslip rows */}
            {[
                ["Basic Pay", "₹ 45,000"],
                ["HRA", "₹ 18,000"],
                ["TDS", "₹ 6,240"],
                ["80C Ded.", "₹ 12,500"],
                ["Net Pay", "₹ 38,760"],
            ].map(([label, value], i) => (
                <g key={label} transform={`translate(0, ${i * 32})`}>
                    <text x="35" y="122" fontSize="9.5" fill="#94a3b8">{label}</text>
                    <text x="162" y="122" textAnchor="end" fontSize="9.5" fontWeight="600" fill={i === 4 ? "#f59e0b" : "#475569"}>{value}</text>
                    {i < 4 && <line x1="32" y1="127" x2="162" y2="127" stroke="#f1f5f9" strokeWidth="1" />}
                </g>
            ))}

            {/* ── Thread / Sutra (middle) ── */}
            <path d="M180,170 Q260,140 340,170" stroke="url(#threadGrad)" strokeWidth="3" fill="none"
                strokeLinecap="round" filter="url(#glow)" strokeDasharray="6 3">
                <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1.2s" repeatCount="indefinite" />
            </path>
            {/* Sutra text on thread */}
            <text x="260" y="151" textAnchor="middle" fontSize="9" fontWeight="700" fill="#f59e0b" letterSpacing="2">SUTRA</text>
            {/* AI brain node */}
            <circle cx="260" cy="170" r="28" fill="white" stroke="#f59e0b" strokeWidth="2.5" filter="url(#glow)" className="dark:fill-[#162038] dark:stroke-amber-400">
                <animate attributeName="r" values="28;30;28" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <text x="260" y="165" textAnchor="middle" fontSize="18">🧠</text>
            <text x="260" y="180" textAnchor="middle" fontSize="7.5" fontWeight="700" fill="#f59e0b">AI</text>

            {/* ── Insights card (right) ── */}
            <rect x="345" y="60" width="155" height="220" rx="14" fill="white" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-[#1e2d4a] dark:stroke-[#334155]" />
            <rect x="345" y="60" width="155" height="36" rx="14" fill="#10b981" />
            <rect x="345" y="82" width="155" height="14" fill="#10b981" />
            <text x="422" y="83" textAnchor="middle" fontSize="11" fontWeight="700" fill="white">INSIGHTS</text>

            {/* Insight rows */}
            {[
                { icon: "🏠", label: "HRA — Tax Free", color: "#10b981" },
                { icon: "🛡️", label: "TDS — Optimised", color: "#f59e0b" },
                { icon: "📋", label: "File ITR-1", color: "#6366f1" },
                { icon: "💡", label: "Save ₹4,200 more", color: "#f97316" },
                { icon: "✅", label: "Compliant 2025", color: "#10b981" },
            ].map(({ icon, label, color }, i) => (
                <g key={label}>
                    <text x="360" y={128 + i * 32} fontSize="12">{icon}</text>
                    <text x="380" y={128 + i * 32} fontSize="9.5" fill={color} fontWeight="600">{label}</text>
                </g>
            ))}

            {/* ── ITR Badge bottom ── */}
            <rect x="170" y="310" width="180" height="44" rx="22" fill="url(#threadGrad)" filter="url(#glow)" />
            <text x="260" y="328" textAnchor="middle" fontSize="10" fontWeight="700" fill="white">YOUR CORRECT FORM</text>
            <text x="260" y="345" textAnchor="middle" fontSize="13" fontWeight="900" fill="white">ITR-1 Matched ✓</text>
        </svg>
    );
}