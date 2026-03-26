"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";


type Theme = "light" | "dark";

interface ThemeCtx {
    theme: Theme;
    isDark: boolean;
    toggle: () => void;
    setTheme: (t: Theme) => void;
}

const Ctx = createContext<ThemeCtx>({
    theme: "light", isDark: false, toggle: () => { }, setTheme: () => { },
});

export const useTheme = () => useContext(Ctx);

function applyTheme(theme: Theme) {
    
    // Toggle the `dark` class that @custom-variant picks up
    document.documentElement.classList.toggle("dark", theme === "dark");

    // Update mobile browser UI chrome colour
    document
        .querySelector<HTMLMetaElement>('meta[name="theme-color"]')
        ?.setAttribute("content", theme === "dark" ? "#000000" : "#ffffff");
}

export default function ThemeProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [theme, setThemeState] = useState<Theme>("light");
    const [mounted, setMounted] = useState(false);

    // Resolve saved / system preference on mount
    useEffect(() => {
        const saved = localStorage.getItem("ts-theme") as Theme | null;
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const resolved: Theme = saved ?? (prefersDark ? "dark" : "light");
        setThemeState(resolved);
        applyTheme(resolved);
        setMounted(true);
    }, []);

    // Stay in sync with OS changes — only if user hasn't pinned a choice
    useEffect(() => {
        const mq = window.matchMedia("(prefers-color-scheme: dark)");
        const handler = (e: MediaQueryListEvent) => {
            if (!localStorage.getItem("ts-theme")) {
                const next: Theme = e.matches ? "dark" : "light";
                setThemeState(next);
                applyTheme(next);
            }
        };
        mq.addEventListener("change", handler);
        return () => mq.removeEventListener("change", handler);
    }, []);

    const setTheme = useCallback((t: Theme) => {
        setThemeState(t);
        applyTheme(t);
        localStorage.setItem("ts-theme", t);
    }, []);

    const toggle = useCallback(() => {
        setThemeState((prev) => {
            const next: Theme = prev === "dark" ? "light" : "dark";
            applyTheme(next);
            localStorage.setItem("ts-theme", next);
            return next;
        });
    }, []);

    // Hide children until theme is resolved — prevents wrong-theme flash
    if (!mounted) return null;

    return (
        <Ctx.Provider value={{ theme, isDark: theme === "dark", toggle, setTheme }}>
            {children}
        </Ctx.Provider>
    );
}