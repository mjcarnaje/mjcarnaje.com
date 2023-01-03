"use client";

import { formatMs, randomNum } from "@lib/misc";
import { TimeRange, TrackReponse } from "@typings/spotify-profile";
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
      <div className="flex flex-col gap-4 w-full">
        {tracks.map((track) => (
          <Link key={track.id} href={track.uri}>
            <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-zinc-800 transition duration-200 ease-in-out justify-between">
              <Image
                src={track.image_url}
                alt="Picture of the author"
                width={64}
                height={64}
                className="rounded-sm mr-6"
              />
              <div className="flex-1">
                <h3 className="text-white font-medium">{track.title}</h3>
                <p className="text-zinc-400 text-sm">{`${track.artist} · ${track.album}`}</p>
              </div>

              <div>
                <p className="text-zinc-400 text-sm">
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
    <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-zinc-800 transition duration-200 ease-in-out justify-between">
      <div className="w-16 h-16 bg-zinc-800 rounded-sm mr-6" />
      <div className="flex-1">
        <div
          className="w-full h-4 bg-zinc-800 rounded-sm"
          style={{ width: `${randomNum(30, 50)}%` }}
        />
        <div
          className="w-full h-3 bg-zinc-800 rounded-sm mt-2"
          style={{ width: `${randomNum(20, 30)}%` }}
        />
      </div>
      <div>
        <div className="w-10 h-4 bg-zinc-800 rounded-sm" />
      </div>
    </div>
  );
}
