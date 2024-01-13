"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItemProps {
  href: string;
  children: React.ReactNode;
}

export function NavItem({ href, children }: NavItemProps) {
  const pathname = usePathname();
  const isActive = pathname.substring(1).startsWith(href.substring(1));

  return (
    <li className="flex items-center justify-center w-full">
      <Link
        href={href}
        className={clsx(
          "relative block px-3 py-2 transition text-zinc-50",
          isActive
            ? "text-indigo-500 dark:text-indigo-400 font-medium"
            : "hover:text-indigo-500 dark:hover:text-indigo-400 font-normal"
        )}
      >
        {children}
        {isActive && (
          <span className="absolute h-px inset-x-1 -bottom-px bg-gradient-to-r from-indigo-500/0 via-indigo-500/40 to-indigo-500/0 dark:from-indigo-400/0 dark:via-indigo-400/40 dark:to-indigo-400/0" />
        )}
      </Link>
    </li>
  );
}
