/* eslint-disable @next/next/no-img-element */
import { formatNumber } from "lib/misc";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface ProfileProps {
  data: SpotifyApi.UserProfileResponse;
}

export const Profile: React.FC<ProfileProps> = ({ data }) => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <img
        src={data.images?.[0]?.url || ""}
        alt={`${data.display_name}'s profile picture`}
        className="rounded-full mb-6 w-48 h-48"
      />
      <div>
        <Link href={data.uri}>
          <h1 className="text-gray-50 font-bold text-5xl hover:text-green-500">
            {data.display_name}
          </h1>
        </Link>
      </div>
    </div>
  );
};
