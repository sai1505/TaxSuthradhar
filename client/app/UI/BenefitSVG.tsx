
export default function BenefitSVG() {
    return (
        <svg viewBox="0 0 520 380" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <radialGradient id="winGrad" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fffbeb" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="goldBar" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#fbbf24" />
                </linearGradient>
            </defs>

            {/* ── Central trophy / checkmark ── */}
            <circle cx="260" cy="190" r="60" fill="white" stroke="url(#goldBar)" strokeWidth="3" className="dark:fill-[#1a1a2e]">
                <animate attributeName="r" values="60;64;60" dur="3s" repeatCount="indefinite" />
            </circle>
            <text x="260" y="205" textAnchor="middle" fontSize="44">🏆</text>

            {/* ── 4 benefit cards around the center ── */}
            {/* Zero Anxiety - top left */}
            <rect x="30" y="30" width="160" height="80" rx="14" fill="white" stroke="#c7d2fe" strokeWidth="1.5" className="dark:fill-[#1e1e3a] dark:stroke-indigo-900" />
            <text x="50" y="58" fontSize="20">😌</text>
            <text x="78" y="57" fontSize="12" fontWeight="700" fill="#4f46e5">Zero Anxiety</text>
            <text x="42" y="73" fontSize="9" fill="#94a3b8">No more "wrong form?"</text>
            <text x="42" y="85" fontSize="9" fill="#94a3b8">sleepless nights.</text>
            <text x="42" y="100" fontSize="9" fontWeight="600" fill="#6366f1">Peace. Guaranteed.</text>

            {/* Smart Savings - top right */}
            <rect x="330" y="30" width="160" height="80" rx="14" fill="white" stroke="#a7f3d0" strokeWidth="1.5" className="dark:fill-[#0d2b1f] dark:stroke-emerald-900" />
            <text x="350" y="58" fontSize="20">💡</text>
            <text x="378" y="57" fontSize="12" fontWeight="700" fill="#059669">Smart Savings</text>
            <text x="342" y="73" fontSize="9" fill="#94a3b8">Identify savings you didn't</text>
            <text x="342" y="85" fontSize="9" fill="#94a3b8">know existed in your salary.</text>
            <text x="342" y="100" fontSize="9" fontWeight="600" fill="#10b981">₹ More in your pocket.</text>

            {/* Time Reclaimed - bottom left */}
            <rect x="30" y="270" width="160" height="80" rx="14" fill="white" stroke="#fde68a" strokeWidth="1.5" className="dark:fill-[#1f1800] dark:stroke-yellow-900" />
            <text x="50" y="298" fontSize="20">⏱️</text>
            <text x="78" y="297" fontSize="12" fontWeight="700" fill="#d97706">Time Reclaimed</text>
            <text x="42" y="313" fontSize="9" fill="#94a3b8">Hours of googling reduced</text>
            <text x="42" y="325" fontSize="9" fill="#94a3b8">to just 30 seconds.</text>
            <text x="42" y="340" fontSize="9" fontWeight="600" fill="#f59e0b">Work smarter. Always.</text>

            {/* Expert Clarity - bottom right */}
            <rect x="330" y="270" width="160" height="80" rx="14" fill="white" stroke="#fecaca" strokeWidth="1.5" className="dark:fill-[#2a0f0f] dark:stroke-red-900" />
            <text x="350" y="298" fontSize="20">🧑‍💼</text>
            <text x="378" y="297" fontSize="12" fontWeight="700" fill="#dc2626">Expert Clarity</text>
            <text x="342" y="313" fontSize="9" fill="#94a3b8">Tax consultant power</text>
            <text x="342" y="325" fontSize="9" fill="#94a3b8">in your pocket.</text>
            <text x="342" y="340" fontSize="9" fontWeight="600" fill="#ef4444">Free during Beta.</text>

            {/* Connector lines from center to cards */}
            {[
                { x1: 210, y1: 155, x2: 165, y2: 95 },
                { x1: 310, y1: 155, x2: 360, y2: 95 },
                { x1: 210, y1: 225, x2: 165, y2: 295 },
                { x1: 310, y1: 225, x2: 360, y2: 295 },
            ].map(({ x1, y1, x2, y2 }, i) => (
                <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
                    stroke="url(#goldBar)" strokeWidth="1.5" strokeDasharray="5 4" opacity="0.4" />
            ))}

            {/* "App for you" badge */}
            <rect x="185" y="326" width="150" height="32" rx="16" fill="url(#goldBar)" />
            <text x="260" y="347" textAnchor="middle" fontSize="11" fontWeight="800" fill="white">Accuracy → Authority 🎯</text>
        </svg>
    );
}