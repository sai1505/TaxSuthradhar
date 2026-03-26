import type { Metadata } from "next";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "TaxSuthradhar — India's AI Tax Compliance Assistant",
  description:
    "File smarter, save more. TaxSuthradhar is your AI-powered tax compliance assistant built for India.",
};

const ANTI_FOUC = `(function(){
  try {
    var t = localStorage.getItem('ts-theme');
    var d = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (t === 'dark' || (t === null && d)) {
      document.documentElement.classList.add('dark');
    }
  } catch(e) {}
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Must be first in <head> — blocks paint until dark class is set */}
        <script dangerouslySetInnerHTML={{ __html: ANTI_FOUC }} />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="flex flex-col min-h-screen flex flex-col bg-white dark:bg-black text-neutral-900 dark:text-neutral-50 transition-colors duration-300">
        {children}
      </body>
    </html>
  );
}
