import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/misc";
import { Metadata } from "next";
import { Fira_Code, Inter } from "next/font/google";
import { AnalyticsWrapper } from "../components/Analytics";
import "./globals.css";
import "./nprogress.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export const metadata: Metadata = {
  title: "Michael James Carnaje",
  description:
    "Hello! I'm Michael James Carnaje, a coder from the Philippines. Here you can find my projects, blog posts, and more.",
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={cn(inter.variable, firaCode.variable)}>
        <AnalyticsWrapper />
        <body className="relative min-h-screen bg-dot-black/[0.2] text-gray-800 bg-gray-100 sm:px-8">
          <main>{children}</main>
          <Toaster />
        </body>
      </html>
    </>
  );
}
