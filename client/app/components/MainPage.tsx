"use client";

import { useEffect, useRef, useState } from "react";

function useInView(threshold = 0.15) {
    const ref = useRef<HTMLDivElement>(null);
    const [inView, setInView] = useState(false);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
            { threshold }
        );
        obs.observe(el);
        return () => obs.disconnect();
    }, [threshold]);
    return { ref, inView };
}


/* HERO SECTION */
function HeroSection() {
    return (
        <section id="home" className="
      relative min-h-screen flex flex-col items-center justify-center
      overflow-hidden pt-16
      bg-gradient-to-br from-amber-50 via-white to-orange-50
      dark:from-black dark:via-black dark:to-black
    ">
            {/* Background grid */}
            <div className="absolute inset-0 opacity-30 dark:opacity-10"
                style={{
                    backgroundImage: `linear-gradient(rgba(245,158,11,0.15) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245,158,11,0.15) 1px, transparent 1px)`,
                    backgroundSize: "48px 48px"
                }}
            />
            {/* Glowing orbs */}
            <div className="absolute top-1/4 -left-24 w-72 h-72 rounded-full bg-amber-300/20 dark:bg-amber-500/10 blur-3xl animate-pulse" />
            <div className="absolute bottom-1/4 -right-24 w-96 h-96 rounded-full bg-orange-300/20 dark:bg-orange-600/10 blur-3xl animate-pulse [animation-delay:1.5s]" />

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                <h1 className="
          text-5xl md:text-7xl font-black leading-[1.05] mb-6 tracking-tight
          text-slate-900 dark:text-white
          animate-[fadeInUp_0.7s_ease_0.1s_both]
        ">
                    Meet your{" "}
                    <span className="
            relative inline-block
            text-transparent bg-clip-text
            bg-gradient-to-r from-amber-500 via-orange-500 to-amber-400
          ">
                        Tax Suthradhar
                        <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 300 12" preserveAspectRatio="none">
                            <path d="M0,8 Q75,0 150,6 Q225,12 300,4" stroke="url(#underlineGrad)" strokeWidth="3" fill="none" strokeLinecap="round" />
                            <defs>
                                <linearGradient id="underlineGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="#f59e0b" />
                                    <stop offset="100%" stopColor="#f97316" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </span>
                </h1>

                <p className="
          text-xl md:text-2xl text-slate-500 dark:text-slate-300 mb-4 font-light
          leading-relaxed max-w-2xl mx-auto
          animate-[fadeInUp_0.7s_ease_0.25s_both]
        ">
                    The bridge between your <strong className="text-slate-700 dark:text-white font-semibold">Pay</strong> and your{" "}
                    <strong className="text-slate-700 dark:text-white font-semibold">Peace of Mind.</strong>
                </p>
                <p className="
          text-base text-slate-400 dark:text-slate-400 mb-10 max-w-xl mx-auto
          animate-[fadeInUp_0.7s_ease_0.35s_both]
        ">
                    In an era of complex tax codes and shifting regimes, you deserve more than just a calculator.
                    You deserve a <em className="text-amber-500 not-italic font-medium">translator</em>.
                </p>

                <div className="
          flex flex-col sm:flex-row gap-4 justify-center
          animate-[fadeInUp_0.7s_ease_0.45s_both]
        ">
                    <button className="
            px-8 py-4 rounded-2xl font-bold text-base
            bg-gradient-to-r from-amber-400 to-orange-500
            hover:from-amber-500 hover:to-orange-600
            text-white shadow-xl shadow-amber-300/40 dark:shadow-amber-500/20
            hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer
          ">
                        Upload Your Payslip →
                    </button>
                </div>

                {/* Stats row */}
                <div className="
          mt-16 flex flex-wrap gap-8 justify-center
          text-center
          animate-[fadeInUp_0.7s_ease_0.55s_both]
        ">
                    {[
                        { value: "99%", label: "Parse Accuracy" },
                        { value: "30s", label: "Full Analysis" },
                        { value: "DPDP", label: "Act 2026 Compliant" },
                        { value: "Free", label: "Beta Access" },
                    ].map(({ value, label }) => (
                        <div key={label}>
                            <div className="text-2xl font-black text-amber-500">{value}</div>
                            <div className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5">{label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/*SVG: THREAD / SUTRA CONNECTOR */
function SutraDivider() {
    return (
        <div className="flex justify-center py-2 dark:bg-black">
            <svg viewBox="0 0 800 60" className="w-full max-w-3xl h-12 opacity-50 dark:opacity-60">
                <path d="M0,30 Q100,5 200,30 Q300,55 400,30 Q500,5 600,30 Q700,55 800,30"
                    stroke="url(#sutraGrad)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                <circle cx="400" cy="30" r="5" fill="url(#sutraGrad)" />
                <defs>
                    <linearGradient id="sutraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}

/* ─────────────────────────────────────────────
   SECTION 1: PRODUCT
───────────────────────────────────────────── */
function ProductSVG() {
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

function Section1Product() {
    const { ref, inView } = useInView();
    return (
        <section id="product" className="
      py-28 px-6
      bg-white dark:bg-black
    ">
            <div ref={ref} className={`
        max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center
        transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
                {/* Text */}
                <div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-6">
                        The bridge between your{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                            Pay
                        </span>{" "}
                        and your Peace of Mind.
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-300 leading-relaxed mb-6">
                        Tax Suthradhar is an <strong className="text-slate-700 dark:text-white">AI-native financial companion</strong> built for the modern Indian employee. We don't just "calculate" numbers — we decode your payslip, translate tax jargon into human language, and chart your path to the correct ITR form.
                    </p>
                    <p className="text-base text-slate-400 dark:text-slate-400 leading-relaxed border-l-4 border-amber-400 pl-5 italic">
                        It's not just a tool — it's the <strong className="not-italic text-amber-500">thread (Sutra)</strong> that holds your financial compliance together.
                    </p>

                    <div className="mt-8 grid grid-cols-2 gap-4">
                        {[
                            { icon: "🔍", title: "Decode", desc: "Every payslip line explained" },
                            { icon: "🗺️", title: "Navigate", desc: "Right ITR form, always" },
                            { icon: "🌐", title: "Translate", desc: "Tax jargon → plain English" },
                            { icon: "🔒", title: "Protect", desc: "DPDP Act 2026 compliant" },
                        ].map(({ icon, title, desc }) => (
                            <div key={title} className="
                flex items-start gap-3 p-4 rounded-xl
                bg-amber-50/60 dark:bg-neutral-950/40
                border border-amber-100 dark:border-neutral-800
                hover:border-1 hover:border-amber-300 dark:hover:border-amber-600
                transition-all duration-200 group
              ">
                                <span className="text-2xl">{icon}</span>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-white text-sm">{title}</div>
                                    <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{desc}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* SVG */}
                <div className="
          relative rounded-3xl overflow-hidden
          bg-gradient-to-br from-slate-50 to-amber-50/50
          dark:from-black dark:to-black
          border border-slate-200 dark:border-neutral-800
          p-6 shadow-2xl shadow-amber-100/30 dark:shadow-black/30
        ">
                    <ProductSVG />
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 2: THE PROBLEM SVG
───────────────────────────────────────────── */
function ProblemSVG() {
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

function Section2Problem() {
    const { ref, inView } = useInView();
    return (
        <section id="problem" className="
      py-28 px-6
      bg-gradient-to-b from-red-50/30 to-white
      dark:from-black dark:to-black
    ">
            <div ref={ref} className={`
        max-w-6xl mx-auto
        transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
                {/* Header */}
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-3xl mx-auto">
                        Why did we build this? Because your Payslip{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-500">
                            shouldn't be a puzzle.
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                        The Income Tax Act 2025 is here, with a new language of deductions. Most employees see TDS or HRA on their slip but have <strong className="text-red-500">no idea why</strong> that amount was deducted.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* SVG */}
                    <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-red-50 to-orange-50/40
            dark:from-black dark:to-black
            border border-red-100/80 dark:border-red-900/30
            p-6 shadow-2xl shadow-red-100/30 dark:shadow-black/30
          ">
                        <ProblemSVG />
                    </div>

                    {/* Pain points */}
                    <div className="space-y-6">
                        {[
                            {
                                icon: "🔐",
                                tag: "The Jargon Trap",
                                color: "red",
                                desc: "Sections 80C, 10(14), and 24(b) feel like secret codes written in an alien language. Most employees just… give up.",
                            },
                            {
                                icon: "📝",
                                tag: "The ITR Guesswork",
                                color: "orange",
                                desc: "Filing ITR-1 when you actually need ITR-2 leads to dreaded tax notices and sleepless nights of panic-googling.",
                            },
                            {
                                icon: "🕶️",
                                tag: "The Blind Spot",
                                color: "amber",
                                desc: "You only realize you could have saved more tax when it's already too late in March — the audit clock has stopped.",
                            },
                        ].map(({ icon, tag, color, desc }) => (
                            <div key={tag} className={`
                flex gap-5 p-6 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-md
                hover:-translate-y-0.5
                transition-all duration-200
              `}>
                                <div className={`
                  w-12 h-12 rounded-xl flex-shrink-0
                  bg-${color}-100 dark:bg-black
                  flex items-center justify-center text-2xl
                `}>
                                    {icon}
                                </div>
                                <div>
                                    <div className={`font-bold text-${color}-600 dark:text-${color}-400 text-sm mb-1`}>{tag}</div>
                                    <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 3: THE SOLUTION SVG
───────────────────────────────────────────── */
function SolutionSVG() {
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
            <rect x="18" y="50" width="130" height="170" rx="10" fill="white" stroke="#e2e8f0" strokeWidth="1.5" className="dark:fill-[#1a2035] dark:stroke-slate-700" />
            <rect x="18" y="50" width="130" height="28" rx="10" fill="#94a3b8" />
            <rect x="18" y="65" width="130" height="13" fill="#94a3b8" />
            <text x="83" y="68" textAnchor="middle" fontSize="10" fill="white" fontWeight="700">PDF PAYSLIP</text>
            <g opacity="0.45">
                {[0, 1, 2, 3, 4, 5, 6].map(i => (
                    <rect key={i} x="32" y={92 + i * 16} width={i % 2 === 0 ? 88 : 68} height="7" rx="3.5" fill="#94a3b8" />
                ))}
            </g>
            <text x="83" y="205" textAnchor="middle" fontSize="11" fill="#94a3b8">Unreadable…</text>

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

function Section3Solution() {
    const { ref, inView } = useInView();
    return (
        <section id="solution" className="
      py-28 px-6
      bg-gradient-to-b from-emerald-50/30 via-white to-white
      dark:from-black dark:via-black dark:to-black
    ">
            <div ref={ref} className={`
        max-w-6xl mx-auto
        transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
                        Your Payslip,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">
                            Finally Transparent.
                        </span>
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                        Upload any PDF. Our multimodal AI reads every line and hands you back clarity, not confusion.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* Features grid */}
                    <div className="grid gap-5">
                        {[
                            {
                                num: "01",
                                icon: "⚡",
                                title: "Instant AI Parsing",
                                desc: "Upload any PDF. Our multimodal AI reads every line — from Basic Pay to obscure allowances — with 99% accuracy.",
                                color: "amber",
                            },
                            {
                                num: "02",
                                icon: "💬",
                                title: "Contextual Insights",
                                desc: "We explain the \"Why.\" If your TDS is high, we tell you exactly which component triggered it.",
                                color: "blue",
                            },
                            {
                                num: "03",
                                icon: "🎯",
                                title: "ITR Matching Engine",
                                desc: "Based on your unique income components (Arrears, Foreign Income, Capital Gains), we tell you exactly which form to file.",
                                color: "purple",
                            },
                            {
                                num: "04",
                                icon: "🔒",
                                title: "Privacy First",
                                desc: "Built on the DPDP Act 2026 framework. We process data in real-time and never store your sensitive PDFs.",
                                color: "emerald",
                            },
                        ].map(({ num, icon, title, desc, color }) => (
                            <div key={title} className={`
                flex gap-5 p-5 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-300 group cursor-default
              `}>
                                <div className={`
                  relative flex-shrink-0 w-12 h-12 rounded-xl
                  bg-white dark:bg-black
                  flex items-center justify-center text-xl
                  group-hover:scale-110 transition-transform duration-200
                `}>
                                    {icon}
                                    <span className={`
                    absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full
                    bg-amber-500 text-white text-[9px] font-black
                    flex items-center justify-center
                  `}>{num}</span>
                                </div>
                                <div>
                                    <div className="font-bold text-slate-800 dark:text-white mb-1">{title}</div>
                                    <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* SVG */}
                    <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-emerald-50 to-teal-50/30
            dark:from-black dark:to-black
            border border-emerald-100/80 dark:border-emerald-800/30
            p-6 shadow-2xl shadow-emerald-100/40 dark:shadow-black/30
          ">
                        <SolutionSVG />
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   SECTION 4: THE BENEFIT SVG
───────────────────────────────────────────── */
function BenefitSVG() {
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

function Section4Benefits() {
    const { ref, inView } = useInView();
    return (
        <section id="benefits" className="
      py-28 px-6
      bg-gradient-to-b from-amber-50/30 via-white to-amber-50/20
      dark:from-black dark:via-black dark:to-black
    ">
            <div ref={ref} className={`
        max-w-6xl mx-auto
        transition-all duration-700
        ${inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
      `}>
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white leading-tight mb-4 max-w-2xl mx-auto">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-500 to-orange-500">
                            Accuracy
                        </span>{" "}
                        for the App,{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-500">
                            Authority
                        </span>{" "}
                        for You.
                    </h2>
                    <p className="text-lg text-slate-500 dark:text-slate-400 max-w-xl mx-auto">
                        The emotional and practical win for every modern Indian professional.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-16 items-center">
                    {/* SVG */}
                    <div className="
            relative rounded-3xl overflow-hidden
            bg-gradient-to-br from-amber-50/60 to-yellow-50/40
            dark:from-black dark:to-black
            border border-amber-100 dark:border-amber-900/30
            p-6 shadow-2xl shadow-amber-100/40 dark:shadow-black/30
          ">
                        <BenefitSVG />
                    </div>

                    {/* Benefit list */}
                    <div className="space-y-6">
                        {[
                            {
                                emoji: "😌",
                                title: "Zero Anxiety",
                                desc: "No more 'Did I file the wrong form?' sleepless nights. Our engine checks everything before you submit.",
                                stat: "0 Tax Notices",
                                color: "indigo",
                            },
                            {
                                emoji: "💡",
                                title: "Smart Savings",
                                desc: "Identify tax-saving opportunities you didn't know existed in your own salary structure.",
                                stat: "Avg. ₹4,200 saved",
                                color: "emerald",
                            },
                            {
                                emoji: "⏱️",
                                title: "Time Reclaimed",
                                desc: "What used to take hours of googling and calling your 'tax guy' now takes just 30 seconds.",
                                stat: "30 sec analysis",
                                color: "amber",
                            },
                            {
                                emoji: "🧑‍💼",
                                title: "Expert Clarity, For Free",
                                desc: "Get the power of a tax consultant in your pocket while we are in our beta testing phase.",
                                stat: "Free Beta Access",
                                color: "rose",
                            },
                        ].map(({ emoji, title, desc, stat, color }) => (
                            <div key={title} className={`
                flex gap-5 p-5 rounded-2xl
                bg-white dark:bg-black
                border border-neutral-200 dark:border-neutral-800
                shadow-sm hover:shadow-lg hover:-translate-y-1
                transition-all duration-300
              `}>
                                <div className={`
                  flex-shrink-0 w-12 h-12 rounded-xl
                  bg-white dark:bg-black
                  flex items-center justify-center text-2xl
                `}>
                                    {emoji}
                                </div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <div className="font-bold text-slate-800 dark:text-white">{title}</div>
                                        <span className={`text-xs font-bold text-${color}-600 dark:text-${color}-400 bg-${color}-50 dark:bg-${color}-900/20 px-2 py-0.5 rounded-full`}>
                                            {stat}
                                        </span>
                                    </div>
                                    <p className="text-sm text-slate-400 dark:text-slate-500 leading-relaxed">{desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

/* ─────────────────────────────────────────────
   PAGE STYLES (keyframes injected inline)
───────────────────────────────────────────── */
const keyframeStyles = `
@keyframes fadeInDown {
  from { opacity: 0; transform: translateY(-16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
`;

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function MainPage() {
    return (
        <>
            <style>{keyframeStyles}</style>
            <div className="min-h-screen bg-white dark:bg-[#0a0f1e] text-slate-900 dark:text-white transition-colors duration-300">
                <main>
                    <HeroSection />
                    <SutraDivider />
                    <Section1Product />
                    <SutraDivider />
                    <Section2Problem />
                    <SutraDivider />
                    <Section3Solution />
                    <SutraDivider />
                    <Section4Benefits />
                </main>
            </div>
        </>
    );
}