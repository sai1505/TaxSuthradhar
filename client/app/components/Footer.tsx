import Link from "next/link";
import { Mail } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const SOCIAL = [
    { Icon: FaGithub, href: "#", label: "GitHub" },
    { Icon: Mail, href: "#", label: "Email" },
];

export default function Footer() {
    const year = new Date().getFullYear();

    return (
        <footer className="fixed bottom-0 left-0 w-full bg-white dark:bg-black border-t border-black/[0.06] dark:border-white/[0.06]">

            {/* Divider */}
            <div className="container-page">
                <div className="h-px bg-black/[0.05] dark:bg-white/[0.05]" />
            </div>

            {/* Bottom Bar */}
            <div className="container-page py-6">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-2">

                    {/* Left */}
                    <p className="text-xs text-black/50 dark:text-white/30">
                        © {year} TaxSuthradhar. All rights reserved.
                    </p>

                    {/* Center */}
                    <div className="flex items-center gap-1.5 text-xs text-black/50 dark:text-white/30">
                        <span>Made with</span>
                        <span className="text-rose-400">♥</span>
                        <span>in India</span>
                        <span className="mx-1.5 text-black/20 dark:text-white/15">·</span>
                    </div>

                    {/* Right (icons) */}
                    <div className="flex items-center gap-2">
                        {SOCIAL.map(({ Icon, href, label }) => (
                            <a
                                key={label}
                                href={href}
                                aria-label={label}
                                className="flex items-center justify-center w-9 h-9 rounded-lg 
                                    border border-black/[0.08] dark:border-white/[0.08]
                                    text-black/50 dark:text-white/40
                                    hover:text-emerald-500 dark:hover:text-emerald-400
                                    hover:border-emerald-500/40
                                    hover:bg-emerald-500/10 dark:hover:bg-emerald-500/8
                                    transition-all duration-200"
                            >
                                <Icon className="w-4 h-4" />
                            </a>
                        ))}
                    </div>

                </div>
            </div>
        </footer>
    );
}