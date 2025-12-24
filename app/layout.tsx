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
  title: "MJ Carnaje",
  description:
    "Hello! I'm Michael James Carnaje, a coder from the Philippines. Here you can find my projects, blog posts, and more.",
  openGraph: {
    title: "MJ Carnaje",
    description: "Hello! I'm Michael James Carnaje, a coder from the Philippines. Here you can find my projects, blog posts, and more.",
    url: "https://mjcarnaje.com",
    siteName: "MJ Carnaje",
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "MJ Carnaje",
    card: "summary_large_image",
  },
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={cn(inter.variable, firaCode.variable)} style={{ scrollBehavior: "smooth" }}>
        <AnalyticsWrapper />
        <body className="relative min-h-screen bg-background text-foreground grain font-sans bg-dot-black/[0.03]">
          {children}
          <Toaster />
        </body>
      </html>
    </>
  );
}
