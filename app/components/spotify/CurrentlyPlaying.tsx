import { SpotifyIcon } from "@assets/icons";
import clsx from "clsx";
import Image from "next/image";
import React from "react";
import { isTrackObjectFull } from "types/util";

interface CurrentlyPlayingProps {
  data: SpotifyApi.CurrentlyPlayingResponse | null;
}

export const CurrentlyPlaying: React.FC<CurrentlyPlayingProps> = ({ data }) => {
  if (!data) {
    return null;
  }

  if (!isTrackObjectFull(data.item)) {
    return null;
  }

  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div className="flex items-center p-4 rounded-xl bg-zinc-800 border-2 border-zinc-700 min-w-[50%]">
        <Image
          src={data.item.album.images[0].url}
          alt="Picture of the author"
          width={80}
          height={80}
          className="rounded-md mr-4"
        />
        <div>
          <h3 className="text-white font-medium">{data.item.name}</h3>
          <p className="text-zinc-400 text-sm">
            {`${data.item.artists.map((a) => a.name).join(", ")} · ${
              data.item.album.name
            }`}
          </p>
          <div className="flex gap-1 items-center">
            <SpotifyIcon
              className={clsx(
                "h-4 w-4",
                data.is_playing ? "fill-green-600" : "fill-zinc-500"
              )}
            />

            <p
              className={clsx(
                "font-medium",
                data.is_playing ? "text-green-600" : "text-zinc-500"
              )}
            >
              {data.is_playing ? "Listening now" : "Not Playing"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
