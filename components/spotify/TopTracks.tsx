import { TrackReponse } from "@typings/spotify-profile";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TopSpotifyLayout } from "./TopSpotifyLayout";

interface TopTracksProps {
  data: TrackReponse[];
}

export const TopTracks: React.FC<TopTracksProps> = ({ data }) => {
  return (
    <TopSpotifyLayout title="Top Tracks" href="/spotify/tracks">
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
    </TopSpotifyLayout>
  );
};
