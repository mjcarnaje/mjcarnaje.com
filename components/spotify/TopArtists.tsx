import { ArtistReponse } from "@typings/spotify-profile";
import { formatNumber } from "lib/misc";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { TopSpotifyLayout } from "./TopSpotifyLayout";

interface TopArtistsProps {
  data: ArtistReponse[];
}

export const TopArtists: React.FC<TopArtistsProps> = ({ data }) => {
  return (
    <TopSpotifyLayout title="Top Artists" href="/spotify/artists">
      {data.map((artist) => (
        <Link key={artist.id} href={artist.uri}>
          <div className="flex items-center p-3 rounded-md cursor-pointer hover:bg-zinc-800 transition duration-200 ease-in-out">
            <Image
              src={artist.image_url}
              alt="Picture of the author"
              width={64}
              height={64}
              className="rounded-full mr-6"
            />
            <div>
              <h3 className="text-white font-medium">{artist.name}</h3>
              <p className="text-zinc-400 text-sm">
                {`${formatNumber(artist.followers_count)} followers`}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </TopSpotifyLayout>
  );
};
