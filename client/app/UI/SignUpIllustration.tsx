export default function SignUpIllustration() {
    return (
        <svg viewBox="-20 0 490 560" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <linearGradient id="hg" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f59e0b" />
                    <stop offset="100%" stopColor="#f97316" />
                </linearGradient>
                <linearGradient id="bg2" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#fef3c7" />
                    <stop offset="100%" stopColor="#fde68a" />
                </linearGradient>
                <radialGradient id="orb" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.12" />
                    <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                </radialGradient>
                <marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                    <path d="M2 1L8 5L2 9" fill="none" stroke="#f59e0b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </marker>
            </defs>

            {/* Background orb */}
            <ellipse cx="230" cy="280" rx="200" ry="240" fill="url(#orb)" />

            {/* Step progress pills */}
            <rect x="60" y="52" width="88" height="26" rx="13" fill="url(#hg)" />
            <text x="104" y="69" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="white" fontFamily="sans-serif">1 Enter info</text>
            <line x1="148" y1="65" x2="182" y2="65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr)">
                <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
            </line>
            <rect x="183" y="52" width="88" height="26" rx="13" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="227" y="69" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b45309" fontFamily="sans-serif">2 Verify</text>
            <line x1="271" y1="65" x2="305" y2="65" stroke="#f59e0b" strokeWidth="1.5" strokeDasharray="4 3" markerEnd="url(#arr)">
                <animate attributeName="stroke-dashoffset" from="0" to="-14" dur="1s" repeatCount="indefinite" />
            </line>
            <rect x="306" y="52" width="88" height="26" rx="13" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1.2" />
            <text x="350" y="69" textAnchor="middle" fontSize="9.5" fontWeight="700" fill="#b45309" fontFamily="sans-serif">3 Access</text>

            {/* Main card */}
            <rect x="100" y="100" width="260" height="370" rx="18" fill="white" stroke="#f59e0b" strokeWidth="1.2"
                className="dark:fill-[#111827]" />
            <rect x="100" y="100" width="260" height="50" rx="18" fill="url(#hg)" />
            <rect x="100" y="126" width="260" height="24" fill="url(#hg)" />
            <text x="230" y="127" textAnchor="middle" fontSize="12" fontWeight="800" fill="white" fontFamily="sans-serif">Create Account</text>
            <text x="230" y="141" textAnchor="middle" fontSize="8.5" fill="white" fontFamily="sans-serif" opacity="0.85">Secure sign-up flow</text>

            {/* Lock icon — bobbing */}
            <circle cx="230" cy="196" r="22" fill="url(#bg2)" stroke="url(#hg)" strokeWidth="1.8">
                <animate attributeName="r" values="22;25;22" dur="3s" repeatCount="indefinite" />
            </circle>
            <rect x="220" y="196" width="20" height="14" rx="4" fill="#f59e0b">
                <animate attributeName="y" values="196;193;196" dur="2.5s" repeatCount="indefinite" />
            </rect>
            <path d="M222 196 Q222 186 230 186 Q238 186 238 196" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round">
                <animate attributeName="d"
                    values="M222 196 Q222 186 230 186 Q238 186 238 196;M222 193 Q222 183 230 183 Q238 183 238 193;M222 196 Q222 186 230 186 Q238 186 238 196"
                    dur="2.5s" repeatCount="indefinite" />
            </path>
            <circle cx="230" cy="202" r="2.5" fill="white">
                <animate attributeName="cy" values="202;199;202" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <rect x="229" y="202" width="2" height="5" rx="1" fill="white">
                <animate attributeName="y" values="202;199;202" dur="2.5s" repeatCount="indefinite" />
            </rect>

            {/* Name field */}
            <rect x="120" y="230" width="220" height="30" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"
                className="dark:fill-[#1e293b] dark:stroke-slate-700" />
            <text x="134" y="249" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">👤 Name</text>
            <text x="182" y="249" fontSize="9" fontWeight="600" fill="#f59e0b" fontFamily="sans-serif">Arjun Sharma</text>
            <rect x="248" y="238" width="1.5" height="11" fill="#f59e0b">
                <animate attributeName="opacity" values="1;0;1" dur="1s" repeatCount="indefinite" />
            </rect>

            {/* Email field with animated checkmark */}
            <rect x="120" y="270" width="220" height="30" rx="8" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1"
                className="dark:fill-[#1e293b] dark:stroke-slate-700" />
            <text x="134" y="289" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">✉ Email</text>
            <text x="172" y="289" fontSize="9" fontWeight="600" fill="#f59e0b" fontFamily="sans-serif">arjun@mail.in</text>
            <circle cx="328" cy="285" r="8" fill="#10b981" />
            <path d="M323 285 L327 289 L334 281" fill="none" stroke="white" strokeWidth="1.8"
                strokeLinecap="round" strokeLinejoin="round" strokeDasharray="30">
                <animate attributeName="stroke-dashoffset" from="30" to="0" dur="0.6s" begin="0.5s" fill="freeze" />
            </path>

            {/* Password field with animated dots */}
            <rect x="120" y="310" width="220" height="30" rx="8" fill="#f8fafc" stroke="#f59e0b" strokeWidth="1.5"
                className="dark:fill-[#1e293b]" />
            <text x="134" y="329" fontSize="9" fill="#94a3b8" fontFamily="sans-serif">🔐 Password</text>
            {[202, 216, 230, 244, 258].map((cx, i) => (
                <circle key={cx} cx={cx} cy="326" r="4" fill="#f59e0b">
                    <animate attributeName="opacity" values="0.3;1;0.3" dur="1.4s" repeatCount="indefinite" begin={`${i * 0.35}s`} />
                </circle>
            ))}

            {/* Strength bar */}
            <rect x="120" y="352" width="220" height="5" rx="2.5" fill="#e2e8f0" className="dark:fill-[#1e293b]" />
            <rect x="120" y="352" width="176" height="5" rx="2.5" fill="#10b981">
                <animate attributeName="width" from="0" to="176" dur="1.8s" begin="0.3s" fill="freeze" />
            </rect>
            <text x="120" y="368" fontSize="8" fill="#10b981" fontWeight="700" fontFamily="sans-serif">● Strong password</text>

            {/* OAuth options */}
            <text x="230" y="384" textAnchor="middle" fontSize="8" fill="#94a3b8" fontFamily="sans-serif">— or sign up with —</text>
            {[
                { x: 197, label: "Google" },
            ].map(({ x, label }) => (
                <g key={label}>
                    <rect x={x} y="394" width="65" height="22" rx="11" fill="#f1f5f9" stroke="#e2e8f0" strokeWidth="1"
                        className="dark:fill-[#1e293b] dark:stroke-slate-700" />
                    <text x={x + 32} y="407" textAnchor="middle" fontSize="8.5" fill="#64748b" fontFamily="sans-serif">{label}</text>
                </g>
            ))}

            <g transform="translate(13,-19)">
                {/* Shield */}
                <ellipse cx="406" cy="258" rx="26" ry="26" fill="#f59e0b" opacity="0.15">
                    <animate attributeName="opacity" values="0.15;0.35;0.15" dur="2.5s" repeatCount="indefinite" />
                </ellipse>

                <path d="M406 238 L422 248 L422 262 Q422 274 406 280 Q390 274 390 262 L390 248 Z"
                    fill="url(#hg)" opacity="0.9" />

                <path d="M400 258 L404 263 L413 252"
                    fill="none" stroke="white" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round" />

                {/* Connector dashes card → right (shield) */}
                {[274].map((y) => (
                    <path
                        key={y}
                        d={`M360 ${y - 19} Q390 ${y - 19} 350 ${y - 19}`}
                        stroke="#f59e0b"
                        strokeWidth="1"
                        strokeDasharray="4 3"
                        opacity="0.5"
                    >
                        <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
                    </path>
                ))}
            </g>


            {/* Left: floating envelope */}
            <rect x="8" y="230" width="52" height="36" rx="6" fill="white" stroke="#f59e0b" strokeWidth="1.2"
                className="dark:fill-[#111827]">
                <animate attributeName="y" values="230;212;230" dur="3.5s" repeatCount="indefinite" />
            </rect>

            <path d="M8 236 L34 248 L60 236" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.7">
                <animate attributeName="d"
                    values="M8 236 L34 248 L60 236;M8 218 L34 230 L60 218;M8 236 L34 248 L60 236"
                    dur="3.5s" repeatCount="indefinite" />
            </path>

            <text x="34" y="286" textAnchor="middle" fontSize="8" fill="#b45309" fontFamily="sans-serif">
                Verify email
            </text>

            {/* OTP boxes */}
            {[
                { x: 30, val: "4", active: false },
                { x: 52, val: "7", active: false },
                { x: 74, val: "2", active: true },
                { x: 96, val: "", active: false, cursor: true },
            ].map(({ x, val, active, cursor }) => (
                <g key={x}>
                    <rect x={x - 40} y="298" width="18" height="20" rx="4"
                        fill={active ? "url(#hg)" : "white"}
                        stroke={active ? "none" : cursor ? "#e2e8f0" : "#f59e0b"}
                        strokeWidth="1.3"
                        className={active ? "" : "dark:fill-[#1e293b]"} />

                    {val && (
                        <text x={x - 31} y="312" textAnchor="middle" fontSize="10" fontWeight="700"
                            fill={active ? "white" : "#f59e0b"} fontFamily="sans-serif">
                            {val}
                        </text>
                    )}

                    {cursor && (
                        <rect x={x - 33} y="303" width="1.5" height="10" fill="#94a3b8">
                            <animate attributeName="opacity" values="1;0;1" dur="0.9s" repeatCount="indefinite" />
                        </rect>
                    )}
                </g>
            ))}

            <text x="32" y="336" textAnchor="middle" fontSize="7.5" fill="#94a3b8" fontFamily="sans-serif">
                OTP code
            </text>

            {/* Connector dashes left → card */}
            {[234].map((y) => (
                <path key={y} d={`M74 ${y} Q100 ${y} 100 ${y}`} stroke="#f59e0b" strokeWidth="1" strokeDasharray="4 3" opacity="0.5">
                    <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="1s" repeatCount="indefinite" />
                </path>
            ))}

            {/* Corner dots */}
            {[60, 78, 96].map((x, i) => (
                <circle key={x} cx={x} cy="530" r="4" fill="#f59e0b" opacity={0.3 + i * 0.2}>
                    <animate attributeName="opacity" values={`${0.3 + i * 0.2};0.9;${0.3 + i * 0.2}`} dur={`${2 + i * 0.5}s`} repeatCount="indefinite" />
                </circle>
            ))}
            {[364, 382, 400].map((x, i) => (
                <circle key={x} cx={x} cy="530" r="4" fill="#f97316" opacity={0.3 + i * 0.2}>
                    <animate attributeName="opacity" values={`${0.3 + i * 0.2};0.9;${0.3 + i * 0.2}`} dur={`${2.2 + i * 0.4}s`} repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
    );
}