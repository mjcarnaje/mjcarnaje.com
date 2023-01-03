"use client";

import { Analytics } from "@components/analytics/Analytics";
import { Inter } from "@next/font/google";
import "@styles/globals.css";
import "@styles/nprogress.css";
import { Router } from "next/router";
import NProgress from "nprogress";
import { useEffect } from "react";
import { Container, NavItem } from "./components";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  useEffect(() => {
    NProgress.configure({
      easing: "ease",
      speed: 800,
      showSpinner: false,
    });

    let timeout: NodeJS.Timeout;
    const start = () =>
      (timeout = setTimeout(() => {
        NProgress.start();
        alert("Loading...");
      }, 100));
    const done = () => {
      clearTimeout(timeout);
      NProgress.done();
    };

    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", done);
    Router.events.on("routeChangeError", done);

    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", done);
      Router.events.off("routeChangeError", done);
      clearTimeout(timeout);
    };
  }, []);

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
