"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Zap, LogIn, UserPlus } from "lucide-react";
import { useTheme } from "./Theme/ThemeProvider";

const NAV_LINKS = [
    { label: "Home", href: "/#home" },
    { label: "Product", href: "/#product" },
    { label: "Problem", href: "/#problem" },
    { label: "Solution", href: "/#solution" },
    { label: "Benefits", href: "/#benefits" },
];

export default function Navbar() {
    const { isDark, toggle } = useTheme();
    const [activeSection, setActiveSection] = useState("#home");
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const sections = ["home", "product", "problem", "solution", "benefits"];

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(`/#${entry.target.id}`);
                    }
                });
            },
            {
                root: null,
                rootMargin: "-40% 0px -50% 0px", // controls trigger point
                threshold: 0,
            }
        );

        sections.forEach((id) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        if (pathname !== "/") {
            setActiveSection(""); // remove active highlight
        }
    }, [pathname]);

    useEffect(() => {
        const handler = () => setScrolled(window.scrollY > 12);
        window.addEventListener("scroll", handler, { passive: true });
        return () => window.removeEventListener("scroll", handler);
    }, []);

    // Close mobile drawer on navigation
    useEffect(() => { setMobileOpen(false); }, [pathname]);

    return (
        <>
            {/* ── ANNOUNCEMENT BANNER ──────────────────────────────── */}
            <div className="w-full bg-banner-gradient py-2 px-4 text-center">
                <span className="text-xs sm:text-sm font-medium tracking-wide text-white/90">
                    India&apos;s AI-powered tax compliance assistant
                    <span className="text-white/90 font-bold ml-1">
                        — File smarter, save more.
                    </span>
                </span>
            </div>

            {/* ── MAIN NAVBAR ──────────────────────────────────────── */}
            <header
                className={[
                    "sticky top-0 z-50 w-full transition-all duration-300",
                    "bg-white/95 dark:bg-black/95 backdrop-blur-md",
                    scrolled
                        ? "shadow-[0_1px_0_0_rgba(0,0,0,0.08)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]"
                        : "",
                ].join(" ")}
            >
                {/* Gradient hairline at bottom of navbar */}
                <div className="absolute bottom-0 left-0 right-0 h-px bg-brand-gradient opacity-30" />

                <nav className="container-page">
                    <div className="flex items-center justify-between h-16">

                        {/* ── BRAND ──────────────────────────────────────── */}
                        <Link
                            href="/"
                            className="flex items-center gap-2.5 group select-none flex-shrink-0"
                        >
                            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-brand-gradient shadow-brand-sm group-hover:opacity-85 transition-opacity duration-200">
                                <Zap className="w-4 h-4 text-white fill-white" strokeWidth={2.5} />
                            </span>
                            <span className="font-display text-[1.15rem] font-extrabold tracking-tight leading-none">
                                <span className="gradient-text">Tax</span>
                                <span className="ml-1 text-neutral-900 dark:text-white">Suthradhar</span>
                            </span>
                        </Link>

                        {/* ── DESKTOP NAV LINKS ─────────────────────────── */}
                        <ul className="hidden md:flex items-center gap-0.5">
                            {NAV_LINKS.map(({ label, href }) => {
                                const active = activeSection === href;
                                return (
                                    <li key={href}>
                                        <Link
                                            href={href}
                                            onClick={() => setActiveSection(href)}
                                            className={[
                                                "relative px-4 py-2 rounded-lg text-sm block transition-all duration-200",
                                                active
                                                    ? "font-semibold"
                                                    : "font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                            ].join(" ")}
                                        >
                                            {active
                                                ? <span className="gradient-text-active">{label}</span>
                                                : label
                                            }
                                            {/* Active underline */}
                                            {active && (
                                                <span className="absolute bottom-0.5 left-4 right-4 h-0.5 rounded-full bg-active-gradient" />
                                            )}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>

                        {/* ── RIGHT ACTIONS ────────────────────────────── */}
                        <div className="flex items-center gap-2 sm:gap-3">

                            {/* Theme toggle */}
                            <button
                                onClick={toggle}
                                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                                className="flex items-center justify-center w-9 h-9 rounded-lg text-neutral-500 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200 focus:outline-none"
                            >
                                {isDark
                                    ? <Sun className="w-[18px] h-[18px] text-amber-400" strokeWidth={2} />
                                    : <Moon className="w-[18px] h-[18px]" strokeWidth={2} />
                                }
                            </button>

                            {/* Login — gradient outline */}
                            <Link
                                href="/auth/signin"
                                className="btn-outline hidden sm:inline-flex items-center gap-2 "
                            >
                                <LogIn className="w-4 h-4 text-current relative z-10" />
                                <span>Login</span>
                            </Link>

                            {/* Sign Up — gradient fill */}
                            <Link
                                href="/auth/signup"
                                className="btn-primary hidden sm:inline-flex items-center gap-2"
                            >
                                <UserPlus className="w-4 h-4" />
                                <span>Sign Up</span>
                            </Link>
                            {/* Mobile hamburger */}
                            <button
                                onClick={() => setMobileOpen((v) => !v)}
                                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                                aria-expanded={mobileOpen}
                                className="md:hidden flex items-center justify-center w-9 h-9 rounded-lg text-neutral-600 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900 transition-colors duration-200"
                            >
                                {mobileOpen
                                    ? <X className="w-5 h-5" />
                                    : <Menu className="w-5 h-5" />
                                }
                            </button>
                        </div>
                    </div>
                </nav>

                {/* ── MOBILE DRAWER ────────────────────────────────── */}
                <div
                    className={[
                        "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
                        "bg-white dark:bg-black",
                        "border-t border-neutral-100 dark:border-neutral-900",
                        mobileOpen
                            ? "max-h-[440px] opacity-100"
                            : "max-h-0 opacity-0 pointer-events-none",
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
                                        "flex items-center px-4 py-3 rounded-xl text-[0.95rem] transition-all duration-150",
                                        active
                                            ? "font-semibold bg-blue-50 dark:bg-blue-950/40"
                                            : "font-medium text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-900",
                                    ].join(" ")}
                                >
                                    {active
                                        ? <span className="gradient-text-active">{label}</span>
                                        : label
                                    }
                                </Link>
                            );
                        })}

                        {/* Mobile auth buttons */}
                        <div className="flex gap-3 pt-4 mt-2 border-t border-neutral-100 dark:border-neutral-900">
                            <Link href="/login" className="btn-outline flex-1 justify-center py-2.5">
                                <span>Login</span>
                            </Link>
                            <Link href="/signup" className="btn-primary flex-1 justify-center py-2.5">
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
}