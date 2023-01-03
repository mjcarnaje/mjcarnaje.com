"use client";

import { ArtistReponse, TimeRange } from "@typings/spotify-profile";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface ArtistsProps {
  data: { [key in TimeRange]: ArtistReponse[] };
}

export function Artists({ data }: ArtistsProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.long_term);

  const artists = data[timeRange];

  const labels = {
    [TimeRange.long_term]: "All Time",
    [TimeRange.medium_term]: "Last 6 Months",
    [TimeRange.short_term]: "Last 4 Weeks",
  };

  return (
    <div className="flex flex-col items-center w-full gap-8">
      <div className="flex gap-4 justify-end w-full">
        {Object.entries(labels).map(([key, label]) => (
          <button
            key={key}
            className={clsx(
              "px-4 py-2 uppercase rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-zinc-900 transition duration-200 ease-in-out",
              {
                "bg-white text-zinc-900": timeRange === key,
              }
            )}
            onClick={() => setTimeRange(key as TimeRange)}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-8">
        {artists.map((artist) => (
          <ArtistItem key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

const ArtistItem = ({ artist }: { artist: ArtistReponse }) => {
  return (
    <div key={artist.id} className="flex flex-col items-center gap-4 w-full">
      <div
        className="relative w-52 h-52"
        onClick={() => window.open(artist.uri, "_blank")}
      >
        <Image
          src={artist.image_url}
          alt={`${artist.name}'s picture`}
          className="transition duration-200 ease-in-out transform hover:brightness-50 cursor-pointer rounded-full object-cover"
          fill
        />
      </div>
      <Link
        href={artist.uri}
        target="_blank"
        className="text-md pb-4 hover:underline underline-offset-4 transition duration-200 ease-in-out"
      >
        {artist.name}
      </Link>
    </div>
  );
};

export function ArtistItemSkeleton() {
  return (
    <div className="flex flex-col items-center gap-4 w-full">
      <div className="relative w-52 h-52">
        <div className="absolute inset-0 bg-zinc-800 animate-pulse rounded-full" />
      </div>
      <div
        className={`h-4 bg-zinc-800 animate-pulse rounded-full ${
          ["w-16", "w-32", "w-28", "w-40"].sort(() => Math.random() - 0.5)[0]
        }`}
      />
    </div>
  );
}
