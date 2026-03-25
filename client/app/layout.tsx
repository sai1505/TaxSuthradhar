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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.className} h-full antialiased suppressHydrationWarning`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
