"use client";

import { formatMs, randomNum } from "@/lib/misc";
import { TimeRange, TrackReponse } from "@/types/spotify-profile";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface TracksProps {
  data: { [key in TimeRange]: TrackReponse[] };
}

export function Tracks({ data }: TracksProps) {
  const [timeRange, setTimeRange] = useState<TimeRange>(TimeRange.long_term);

  const tracks = data[timeRange];

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
      <div className="flex flex-col w-full gap-4">
        {tracks.map((track) => (
          <Link key={track.id} href={track.uri}>
            <div className="flex items-center justify-between p-3 transition duration-200 ease-in-out rounded-md cursor-pointer hover:bg-zinc-800">
              <Image
                src={track.image_url}
                alt="Picture of the author"
                width={64}
                height={64}
                className="mr-6 rounded-sm"
              />
              <div className="flex-1">
                <h3 className="font-medium text-white">{track.title}</h3>
                <p className="text-sm text-zinc-400">{`${track.artist} · ${track.album}`}</p>
              </div>

              <div>
                <p className="text-sm text-zinc-400">
                  {formatMs(track.duration)}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export function TrackSkeleton() {
  return (
    <div className="flex items-center justify-between p-3 transition duration-200 ease-in-out rounded-md cursor-pointer hover:bg-zinc-800">
      <div className="w-16 h-16 mr-6 rounded-sm bg-zinc-800" />
      <div className="flex-1">
        <div
          className="w-full h-4 rounded-sm bg-zinc-800"
          style={{ width: `${randomNum(30, 50)}%` }}
        />
        <div
          className="w-full h-3 mt-2 rounded-sm bg-zinc-800"
          style={{ width: `${randomNum(20, 30)}%` }}
        />
      </div>
      <div>
        <div className="w-10 h-4 rounded-sm bg-zinc-800" />
      </div>
    </div>
  );
}
