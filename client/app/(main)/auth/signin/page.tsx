"use client";

import { useState, useEffect } from "react";
import SignInIllustration from "@/app/UI/SignInIllustration";

/* ─── Math CAPTCHA hook ─── */
function useCaptcha() {
    const [a, setA] = useState(0);
    const [b, setB] = useState(0);
    const [answer, setAnswer] = useState("");
    const [verified, setVerified] = useState(false);

    useEffect(() => {
        setA(Math.floor(Math.random() * 9) + 1);
        setB(Math.floor(Math.random() * 9) + 1);
    }, []);

    const check = () => {
        if (parseInt(answer) === a + b) setVerified(true);
        else {
            setAnswer("");
            setA(Math.floor(Math.random() * 9) + 1);
            setB(Math.floor(Math.random() * 9) + 1);
        }
    };

    return { a, b, answer, setAnswer, verified, check };
}



/* ─── Reusable Input ─── */
function FormInput({
    label, type = "text", value, onChange, placeholder, icon
}: {
    label: string; type?: string; value: string;
    onChange: (v: string) => void; placeholder: string; icon: string;
}) {
    const [show, setShow] = useState(false);
    const isPassword = type === "password";
    return (
        <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">{label}</label>
            <div className="relative group">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-base pointer-events-none select-none">{icon}</span>
                <input
                    type={isPassword && show ? "text" : type}
                    value={value}
                    onChange={e => onChange(e.target.value)}
                    placeholder={placeholder}
                    className="
            w-full pl-11 pr-12 py-3.5 rounded-xl text-sm
            bg-white dark:bg-[#0d1526]
            border border-slate-200 dark:border-slate-700
            focus:border-amber-400 dark:focus:border-amber-500
            focus:ring-2 focus:ring-amber-300/30 dark:focus:ring-amber-500/20
            outline-none transition-all duration-200
            text-slate-800 dark:text-white
            placeholder:text-slate-300 dark:placeholder:text-slate-600
            shadow-sm
          "
                />
                {isPassword && (
                    <button type="button" onClick={() => setShow(s => !s)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors text-xs font-bold select-none">
                        {show ? "HIDE" : "SHOW"}
                    </button>
                )}
            </div>
        </div>
    );
}

/* ─── Main Sign In Page ─── */
export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [remember, setRemember] = useState(false);
    const [error, setError] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const { a, b, answer, setAnswer, verified, check } = useCaptcha();

    const canSubmit = email && password && verified;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!canSubmit) return;
        // Demo: show success state
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-amber-50 via-white to-orange-50 dark:from-black dark:via-black dark:to-black">
                <div className="text-center p-12 rounded-3xl bg-white dark:bg-[#0d1526] border border-amber-200 dark:border-amber-800 shadow-2xl max-w-md w-full mx-4">
                    <div className="text-6xl mb-6">✅</div>
                    <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-3">Welcome back!</h2>
                    <p className="text-slate-500 dark:text-slate-400 mb-2">You have successfully signed in.</p>
                    <p className="text-sm text-amber-500 font-semibold">Redirecting to your dashboard…</p>
                    <button onClick={() => setSubmitted(false)}
                        className="mt-8 px-8 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 text-white font-bold text-sm hover:scale-105 transition-transform">
                        Back to Sign In
                    </button>
                </div>
            </div>
        );
    }

    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800;900&family=Inter:wght@400;500;600&display=swap');
        * { font-family: 'Inter', sans-serif; }
        h1, h2, h3, .font-display { font-family: 'Sora', sans-serif !important; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        .fade-up { animation: fadeUp 0.5s ease both; }
        .fade-up-1 { animation-delay: 0.05s; }
        .fade-up-2 { animation-delay: 0.12s; }
        .fade-up-3 { animation-delay: 0.20s; }
        .fade-up-4 { animation-delay: 0.28s; }
        .fade-up-5 { animation-delay: 0.36s; }
        .fade-up-6 { animation-delay: 0.44s; }
        .fade-up-7 { animation-delay: 0.52s; }
      `}</style>

            <div className="min-h-screen flex bg-gradient-to-br from-amber-50/30 via-white to-orange-50/20 dark:from-[#030712] dark:via-[#0a0f1e] dark:to-[#030712]">

                {/* ─── Left: Illustration panel ─── */}
                <div className="
          hidden lg:flex flex-col items-center justify-center
          w-[480px] xl:w-[520px] flex-shrink-0
          bg-gradient-to-br from-amber-50/80 to-orange-50/50
          dark:from-[#0a0f1e] dark:to-[#0d1220]
          border-r border-amber-100 dark:border-amber-900/20
          relative overflow-hidden
        ">
                    <div className="absolute inset-0 opacity-20"
                        style={{
                            backgroundImage: `linear-gradient(rgba(245,158,11,0.12) 1px, transparent 1px),
                linear-gradient(90deg, rgba(245,158,11,0.12) 1px, transparent 1px)`,
                            backgroundSize: "40px 40px"
                        }}
                    />
                    <div className="relative z-10 p-8 w-full max-w-md">
                        <SignInIllustration />
                        <div className="mt-4 text-center space-y-1">
                            <p className="text-sm font-bold text-slate-600 dark:text-amber-400/80">
                                Welcome back, Suthradhari 🧵
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-600">
                                Your payslip insights are waiting for you
                            </p>
                            {/* Mini stats */}
                            <div className="flex justify-center gap-6 mt-4 pt-4 border-t border-amber-100 dark:border-amber-900/30">
                                {[
                                    { val: "₹4.2K", sub: "Avg. savings" },
                                    { val: "30s", sub: "Analysis time" },
                                    { val: "99%", sub: "Parse accuracy" },
                                ].map(({ val, sub }) => (
                                    <div key={sub} className="text-center">
                                        <div className="text-base font-black text-amber-500">{val}</div>
                                        <div className="text-[10px] text-slate-400 dark:text-slate-600">{sub}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ─── Right: Form ─── */}
                <div className="flex-1 flex items-center justify-center px-6 py-12">
                    <div className="w-full max-w-md">

                        {/* Logo */}
                        <div className="fade-up fade-up-1 mb-8">
                            <div className="inline-flex items-center gap-2.5 mb-1">
                                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-lg shadow-lg shadow-amber-300/40">
                                    🧵
                                </div>
                                <span className="font-display text-xl font-black text-slate-900 dark:text-white">Tax Suthradhar</span>
                            </div>
                            <p className="text-xs text-slate-400 dark:text-slate-500 pl-12">Your Financial Thread of Clarity</p>
                        </div>

                        {/* Heading */}
                        <div className="fade-up fade-up-2 mb-8">
                            <h1 className="font-display text-3xl font-black text-slate-900 dark:text-white mb-1.5 leading-tight">
                                Welcome back
                            </h1>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                                New here?{" "}
                                <a href="/signup" className="text-amber-500 hover:text-amber-600 font-semibold transition-colors">
                                    Create an account →
                                </a>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">

                            {/* Google */}
                            <div className="fade-up fade-up-3">
                                <button type="button" className="
                  w-full flex items-center justify-center gap-3 py-3.5 rounded-xl
                  border border-slate-200 dark:border-slate-700
                  bg-white dark:bg-[#0d1526]
                  hover:border-amber-300 dark:hover:border-amber-600
                  hover:shadow-md
                  text-slate-700 dark:text-white text-sm font-semibold
                  transition-all duration-200 group
                ">
                                    <svg width="18" height="18" viewBox="0 0 24 24">
                                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                                    </svg>
                                    Continue with Google
                                    <span className="ml-auto text-slate-300 dark:text-slate-600 group-hover:text-amber-300 transition-colors text-xs">↗</span>
                                </button>
                            </div>

                            {/* Divider */}
                            <div className="fade-up fade-up-3 flex items-center gap-3">
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                                <span className="text-xs text-slate-400 dark:text-slate-600 font-medium">or sign in with email</span>
                                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-800" />
                            </div>

                            {/* Email */}
                            <div className="fade-up fade-up-4">
                                <FormInput label="Email Address" type="email" value={email} onChange={setEmail}
                                    placeholder="you@company.in" icon="📧" />
                            </div>

                            {/* Password */}
                            <div className="fade-up fade-up-4">
                                <FormInput label="Password" type="password" value={password} onChange={setPassword}
                                    placeholder="Enter your password" icon="🔑" />
                                <div className="flex items-center justify-between mt-2">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input type="checkbox" checked={remember} onChange={e => setRemember(e.target.checked)}
                                            className="w-3.5 h-3.5 accent-amber-500 rounded" />
                                        <span className="text-[11px] text-slate-400 dark:text-slate-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-[11px] text-amber-500 hover:text-amber-600 font-semibold transition-colors">
                                        Forgot password?
                                    </a>
                                </div>
                            </div>

                            {/* Bot Verification */}
                            <div className="fade-up fade-up-5">
                                <div className="
                  p-4 rounded-xl
                  bg-amber-50/60 dark:bg-[#0d1526]
                  border border-amber-100 dark:border-amber-900/40
                ">
                                    <div className="flex items-center gap-2 mb-3">
                                        <span className="text-base">🤖</span>
                                        <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-widest">
                                            Human Verification
                                        </span>
                                    </div>
                                    {verified ? (
                                        <div className="flex items-center gap-2 py-1">
                                            <span className="text-emerald-500 text-lg">✅</span>
                                            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                Verified! You're human.
                                            </span>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-3 flex-wrap">
                                            <div className="
                        flex items-center gap-2 px-4 py-2.5 rounded-lg
                        bg-white dark:bg-[#0a0f1e]
                        border border-amber-200 dark:border-amber-800
                        text-sm font-bold text-slate-700 dark:text-amber-300
                        select-none
                      ">
                                                <span className="text-amber-500 font-black text-base">{a}</span>
                                                <span className="text-slate-400">+</span>
                                                <span className="text-amber-500 font-black text-base">{b}</span>
                                                <span className="text-slate-400">=</span>
                                                <span className="text-slate-300 dark:text-slate-600">?</span>
                                            </div>
                                            <input
                                                type="number"
                                                value={answer}
                                                onChange={e => setAnswer(e.target.value)}
                                                onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); check(); } }}
                                                placeholder="Answer"
                                                className="
                          w-20 px-3 py-2.5 rounded-lg text-sm text-center font-bold
                          bg-white dark:bg-[#0a0f1e]
                          border border-slate-200 dark:border-slate-700
                          focus:border-amber-400 focus:ring-2 focus:ring-amber-300/20
                          outline-none transition-all
                          text-slate-800 dark:text-white
                        "
                                            />
                                            <button type="button" onClick={check}
                                                className="px-4 py-2.5 rounded-lg text-xs font-bold bg-amber-400 hover:bg-amber-500 text-white transition-colors">
                                                Check
                                            </button>
                                        </div>
                                    )}
                                    <p className="text-[10px] text-slate-400 dark:text-slate-600 mt-2">
                                        Privacy-first bot check — no Cloudflare fingerprinting or third-party scripts.
                                    </p>
                                </div>
                            </div>

                            {/* Error */}
                            {error && (
                                <div className="fade-up text-sm text-red-500 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl px-4 py-3">
                                    {error}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="fade-up fade-up-6">
                                <button
                                    type="submit"
                                    disabled={!canSubmit}
                                    className={`
                    w-full py-4 rounded-xl font-bold text-base
                    transition-all duration-300
                    ${canSubmit
                                            ? "bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-500 hover:to-orange-600 text-white shadow-xl shadow-amber-300/30 dark:shadow-amber-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                                            : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed"
                                        }
                  `}
                                >
                                    {canSubmit ? "Sign In →" : "Fill all fields & verify above"}
                                </button>
                            </div>

                            {/* Security note */}
                            <div className="fade-up fade-up-7 text-center">
                                <p className="text-[11px] text-slate-400 dark:text-slate-600 leading-relaxed">
                                    🛡️ Secured with end-to-end encryption &amp; DPDP Act 2026 compliance.{" "}
                                    <a href="#" className="text-amber-500 hover:underline font-medium">Privacy Policy</a>
                                </p>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    );
}