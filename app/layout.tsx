import { Inter } from "@next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-zinc-900 text-zinc-100">
          {children}
        </body>
      </html>
    </>
  );
}
