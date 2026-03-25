"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Zap } from "lucide-react";

const NAV_LINKS = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "The Solution", href: "/solution" },
    { label: "Pricing", href: "/pricing" },
];

/* ── Gradient palette (matches your design system) ── */
const BRAND_GRADIENT = "linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)";
const BUTTON_GRADIENT = "linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #10B981 100%)";
const ACTIVE_GRADIENT = "linear-gradient(90deg, #1E3A8A 0%, #10B981 100%)";
const BANNER_GRADIENT = "linear-gradient(90deg, #0f172a 0%, #1E3A8A 40%, #10B981 80%, #0f172a 100%)";

export default function Navbar() {
    const [isDark, setIsDark] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const saved = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const dark = saved ? saved === "dark" : prefersDark;
        setIsDark(dark);
        document.documentElement.classList.toggle("dark", dark);
    }, []);

    const toggleTheme = () => {
        const next = !isDark;
        setIsDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <>
            {/* ═══════════════════════════════════
          ANNOUNCEMENT BANNER
      ═══════════════════════════════════ */}
            <div
                style={{ background: BANNER_GRADIENT }}
                className="w-full py-2 px-4 text-center"
            >
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90">
                    🇮🇳&nbsp; India&apos;s AI-powered tax compliance assistant
                    <span
                        style={{
                            background: "linear-gradient(90deg, #60a5fa, #34d399)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                        }}
                        className="font-bold ml-1"
                    >
                        — File smarter, save more.
                    </span>
                </span>
            </div>

            {/* ═══════════════════════════════════
          MAIN NAVBAR
      ═══════════════════════════════════ */}
            <header
                className={[
                    "sticky top-0 z-50 w-full transition-all duration-300",
                    /* Light: pure white | Dark: pure black */
                    "bg-white dark:bg-black",
                    scrolled
                        ? "shadow-[0_1px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
                        : "",
                ].join(" ")}
            >
                {/* Hairline gradient border at bottom */}
                <div
                    style={{ background: BRAND_GRADIENT, height: "1.5px" }}
                    className="absolute bottom-0 left-0 right-0 opacity-60"
                />

                <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">

                        {/* ── BRAND ── */}
                        <Link href="/" className="flex items-center gap-2.5 group select-none flex-shrink-0">
                            {/* Icon — gradient background */}
                            <span
                                style={{ background: BRAND_GRADIENT }}
                                className="flex items-center justify-center w-8 h-8 rounded-lg shadow-md group-hover:opacity-90 transition-opacity duration-200"
                            >
                                <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
                            </span>

                            {/* Wordmark */}
                            <span className="text-[1.15rem] font-extrabold tracking-tight leading-none">
                                {/* "Tax" — gradient text */}
                                <span
                                    style={{
                                        background: BRAND_GRADIENT,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                >
                                    Tax
                                </span>
                                {/* "Suthradhar" — solid black / white */}
                                <span className="text-black dark:text-white">
                                    Suthradhar
                                </span>
                            </span>
                        </Link>

                        {/* ── DESKTOP NAV LINKS ── */}
                        <ul className="hidden md:flex items-center gap-0.5">
                            {NAV_LINKS.map(({ label, href }) => {
                                const active = pathname === href;
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            className={[
                                                "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                                                active
                                                    ? "font-semibold"
                                                    : "text-neutral-600 dark:text-neutral-400 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                            ].join(" ")}
                                        >
                                            {/* Active: gradient text */}
                                            {active ? (
                                                <span
                                                    style={{
                                                        background: ACTIVE_GRADIENT,
                                                        WebkitBackgroundClip: "text",
                                                        WebkitTextFillColor: "transparent",
                                                        backgroundClip: "text",
                                                    }}
                                                >
                                                    {label}
                                                </span>
                                            ) : label}

                                            {/* Active underline — gradient */}
                                            {active && (
                                                <span
                                                    style={{ background: ACTIVE_GRADIENT, height: "2px" }}
                                                    className="absolute bottom-0.5 left-4 right-4 rounded-full"
                                                />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* ── RIGHT ACTIONS ── */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Theme toggle */}
                            <button
                                onClick={toggleTheme}
                                aria-label="Toggle dark/light mode"
                                className="flex items-center justify-center w-9 h-9 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 focus:outline-none"
                            >
                                {isDark
                                    ? <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={2} />
                                    : <Moon className="w-[18px] h-[18px] text-neutral-600" strokeWidth={2} />
                                }
                            </button>

                            {/* Login — outlined with gradient border trick */}
                            <Link
                                href="/login"
                                className="hidden sm:inline-flex items-center px-4 py-[7px] rounded-lg text-sm font-semibold relative group focus:outline-none"
                            >
                                {/* Gradient border via pseudo-layer */}
                                <span
                                    style={{ background: BRAND_GRADIENT, borderRadius: "inherit" }}
                                    className="absolute inset-0 opacity-30 group-hover:opacity-50 transition-opacity duration-200"
                                />
                                <span
                                    className="absolute inset-[1.5px] rounded-[7px] bg-white dark:bg-black"
                                />
                                <span
                                    style={{
                                        background: BRAND_GRADIENT,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                    className="relative z-10 font-semibold"
                                >
                                    Login
                                </span>
                            </Link>

                            {/* Sign Up — solid gradient CTA */}
                            <Link
                                href="/signup"
                                style={{ background: BUTTON_GRADIENT }}
                                className="hidden sm:inline-flex items-center px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-md hover:opacity-90 active:scale-[0.97] transition-all duration-200 focus:outline-none"
                            >
                                Sign Up
                            </Link>

                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileOpen}
                                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 focus:outline-none"
                            >
                                {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ═══════════════════════════════════
            MOBILE DRAWER
        ═══════════════════════════════════ */}
                <div
                    className={[
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        mobileOpen ? "max-h-[400px] opacity-100" : "max-h-0 opacity-0",
                        "bg-white dark:bg-black border-t border-neutral-100 dark:border-neutral-900",
                    ].join(" ")}
                    aria-hidden={!mobileOpen}
                >
                    <div className="px-4 pt-3 pb-6 space-y-1">
                        {NAV_LINKS.map(({ label, href }) => {
                            const active = pathname === href;
                            return (
                                <Link
                                    key={href}
                                    href={href}
                                    className={[
                                        "flex items-center px-4 py-3 rounded-xl text-[0.95rem] font-medium transition-all duration-150",
                                        active
                                            ? "font-semibold"
                                            : "text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                    ].join(" ")}
                                    style={active ? { backgroundColor: "rgba(30,58,138,0.06)" } : undefined}
                                >
                                    {active ? (
                                        <span
                                            style={{
                                                background: ACTIVE_GRADIENT,
                                                WebkitBackgroundClip: "text",
                                                WebkitTextFillColor: "transparent",
                                                backgroundClip: "text",
                                            }}
                                        >
                                            {label}
                                        </span>
                                    ) : label}
                                </Link>
                            );
                        })}

                        {/* Mobile auth buttons */}
                        <div className="flex gap-3 pt-4 mt-1 border-t border-neutral-100 dark:border-neutral-900">
                            {/* Mobile Login */}
                            <Link
                                href="/login"
                                className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold relative group focus:outline-none overflow-hidden"
                            >
                                <span
                                    style={{ background: BRAND_GRADIENT }}
                                    className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity"
                                />
                                <span className="absolute inset-[1.5px] rounded-[10px] bg-white dark:bg-black" />
                                <span
                                    style={{
                                        background: BRAND_GRADIENT,
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                    }}
                                    className="relative z-10"
                                >
                                    Login
                                </span>
                            </Link>

                            {/* Mobile Sign Up */}
                            <Link
                                href="/signup"
                                style={{ background: BUTTON_GRADIENT }}
                                className="flex-1 text-center py-2.5 rounded-xl text-sm font-semibold text-white shadow-sm hover:opacity-90 transition-all"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}