import { Metadata } from "next";
import { Inter } from "next/font/google";
import { AnalyticsWrapper } from "../components/Analytics";
import "./globals.css";
import "./nprogress.css";

const inter = Inter({
  variable: "--font-sans",
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
      <html lang="en" className={inter.variable}>
        <AnalyticsWrapper />
        <body className="min-h-screen text-gray-800 bg-gray-100 sm:px-8">
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
