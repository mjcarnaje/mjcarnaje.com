import { Inter } from "next/font/google";
import { AnalyticsWrapper } from "../components/Analytics";
import "./globals.css";
import "./nprogress.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <>
      <html lang="en" className={inter.variable}>
        <AnalyticsWrapper />
        <body className="min-h-screen text-gray-800 bg-gray-100">
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
