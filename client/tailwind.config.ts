import type { Config } from "tailwindcss";

const config: Config = {
    // ─── CRITICAL: enables class-based dark mode ───────────────────
    darkMode: "class",

    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],

    theme: {
        extend: {
            // ── Brand colours ──────────────────────────────────────────
            colors: {
                brand: {
                    navy: "#1E3A8A",
                    blue: "#2563EB",
                    emerald: "#10B981",
                },
            },

            // ── Background-image (gradients as utilities) ───────────────
            backgroundImage: {
                "brand-gradient": "linear-gradient(135deg, #1E3A8A 0%, #10B981 100%)",
                "button-gradient": "linear-gradient(135deg, #1E3A8A 0%, #2563EB 60%, #10B981 100%)",
                "active-gradient": "linear-gradient(90deg,  #1E3A8A 0%, #10B981 100%)",
                "banner-gradient": "linear-gradient(90deg, #0f172a 0%, #1E3A8A 40%, #10B981 80%, #0f172a 100%)",
                "footer-gradient": "linear-gradient(180deg, #0a0f1e 0%, #000000 100%)",
            },

            // ── Font family ─────────────────────────────────────────────
            fontFamily: {
                sans: ["Plus Jakarta Sans", "system-ui", "sans-serif"],
                display: ["Sora", "system-ui", "sans-serif"],
            },

            // ── Shadows ─────────────────────────────────────────────────
            boxShadow: {
                "brand-sm": "0 4px 14px rgba(30,58,138,0.25)",
                "brand-md": "0 6px 24px rgba(30,58,138,0.35)",
                "brand-glow": "0 0 32px rgba(16,185,129,0.20)",
            },

            // ── Animation ───────────────────────────────────────────────
            keyframes: {
                "fade-in": {
                    from: { opacity: "0", transform: "translateY(6px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                "slide-down": {
                    from: { opacity: "0", transform: "translateY(-8px)" },
                    to: { opacity: "1", transform: "translateY(0)" },
                },
                pulse_slow: {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
            },
            animation: {
                "fade-in": "fade-in 0.3s ease forwards",
                "slide-down": "slide-down 0.25s ease forwards",
                "pulse-slow": "pulse_slow 2s ease-in-out infinite",
            },
        },
    },
    plugins: [],
};

export default config;