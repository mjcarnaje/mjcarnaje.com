import Image from "next/image";
import Link from "next/link";
import React from "react";

interface TopTracksProps {
  data: TrackReponse[];
}

export const TopTracks: React.FC<TopTracksProps> = ({ data }) => {
  return (
    <div className="w-full">
      <h1 className="mb-8 text-2xl font-extrabold">Top Tracks</h1>
      <div className="flex flex-col gap-4">
        {data.map((track) => (
          <Link key={track.id} href={track.uri}>
            <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-zinc-800 transition duration-200 ease-in-out">
              <Image
                src={track.image_url}
                alt="Picture of the author"
                width={64}
                height={64}
                className="rounded-sm mr-6"
              />
              <div>
                <h3 className="text-white font-medium">{track.title}</h3>
                <p className="text-zinc-400 text-sm">{`${track.artist} · ${track.album}`}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
