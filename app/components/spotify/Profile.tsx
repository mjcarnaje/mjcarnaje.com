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
      <Image
        src={data.images?.[0]?.url || ""}
        alt="Picture of the author"
        width={180}
        height={180}
        className="rounded-full mb-6"
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
