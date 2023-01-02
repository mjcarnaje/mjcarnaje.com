"use client";

import { Analytics } from "@components/analytics/Analytics";
import { Inter } from "@next/font/google";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "./components";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

function NavItem({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <li className="w-full flex justify-center items-center">
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition",
          isActive
            ? "text-indigo-500 dark:text-indigo-400 font-medium"
            : "hover:text-indigo-500 dark:hover:text-indigo-400 font-normal"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute inset-x-1 -bottom-px h-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 dark:from-indigo-400/0 dark:via-indigo-400/40 dark:to-indigo-400/0" />
        )}
      </Link>
    </li>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" className={inter.variable}>
        <body className="min-h-screen bg-zinc-900 text-zinc-100">
          <Analytics />
          <Container className="h-16 z-10">
            <div className="h-16 pt-6 flex justify-between">
              <div className="w-full" />
              <nav className="min-w-[50%] w-full">
                <ul className="flex rounded-md bg-white/90 px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10">
                  <NavItem href="/">About</NavItem>
                  <NavItem href="/spotify">Spotify Profile</NavItem>
                </ul>
              </nav>
              <div className="w-full" />
            </div>
          </Container>
          <div>{children}</div>
        </body>
      </html>
    </>
  );
}
