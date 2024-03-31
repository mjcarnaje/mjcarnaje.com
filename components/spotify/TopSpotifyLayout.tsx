import Link from "next/link";
import React from "react";

interface TopSpotifyLayoutProps {
  title: string;
  href: string;
  children: React.ReactNode;
}

export const TopSpotifyLayout: React.FC<TopSpotifyLayoutProps> = ({
  title,
  href,
  children,
}) => {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-extrabold">{title}</h1>
        <Link
          href={href}
          className="px-4 py-2 ring-1 ring-zinc-50 uppercase rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-zinc-900"
        >
          See More
        </Link>
      </div>
      <div className="flex flex-col gap-4">{children}</div>
    </div>
  );
};
