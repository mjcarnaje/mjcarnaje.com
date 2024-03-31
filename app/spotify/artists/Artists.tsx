"use client";

import { ArtistReponse, TimeRange } from "@/types/spotify-profile";
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
      <div className="flex justify-end w-full gap-4">
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
      <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
        {artists.map((artist) => (
          <ArtistItem key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

const ArtistItem = ({ artist }: { artist: ArtistReponse }) => {
  return (
    <div key={artist.id} className="flex flex-col items-center w-full gap-4">
      <div
        className="relative w-52 h-52"
        onClick={() => window.open(artist.uri, "_blank")}
      >
        <Image
          src={artist.image_url}
          alt={`${artist.name}'s picture`}
          className="object-cover transition duration-200 ease-in-out transform rounded-full cursor-pointer hover:brightness-50"
          fill
        />
      </div>
      <Link
        href={artist.uri}
        target="_blank"
        className="pb-4 transition duration-200 ease-in-out text-md hover:underline underline-offset-4"
      >
        {artist.name}
      </Link>
    </div>
  );
};

export function ArtistItemSkeleton() {
  return (
    <div className="flex flex-col items-center w-full gap-4">
      <div className="relative w-52 h-52">
        <div className="absolute inset-0 rounded-full bg-zinc-800 animate-pulse" />
      </div>
      <div
        className={`h-4 bg-zinc-800 animate-pulse rounded-full ${
          ["w-16", "w-32", "w-28", "w-40"].sort(() => Math.random() - 0.5)[0]
        }`}
      />
    </div>
  );
}
