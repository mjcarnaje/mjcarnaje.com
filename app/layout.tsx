import { AnalyticsWrapper } from "@components/Analytics";
import { Inter } from "@next/font/google";
import "@styles/globals.css";
import "@styles/nprogress.css";
import { Navbar } from "./components";

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
        <body className="min-h-screen bg-zinc-900 text-zinc-100">
          <AnalyticsWrapper />
          <Navbar />
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
