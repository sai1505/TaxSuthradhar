import type { Config } from "tailwindcss";

// NOTE: In Tailwind v4, custom colors/fonts are defined in globals.css via @theme {}
// This config is only needed for content paths and darkMode strategy.
const config: Config = {
    content: [
        "./client/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./client/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class", // toggled by adding/removing "dark" on <html>
    theme: {
        extend: {},
    },
    plugins: [],
};

export default config;