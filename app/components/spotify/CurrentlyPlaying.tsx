import { SpotifyIcon } from "@assets/icons";
import clsx from "clsx";
import { getAccessToken } from "lib/spotify";
import Image from "next/image";
import { isTrackObjectFull } from "types/util";

async function getCurrentlyPlaying(): Promise<SpotifyApi.CurrentlyPlayingResponse | null> {
  const access_token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );
  if (response.status === 204 || response.status > 400) {
    return null;
  }
  const data = await response.json();
  if (!data) {
    return null;
  }
  return data;
}

const NotPlaying = () => (
  <div>
    <div className="flex gap-2 items-center">
      <SpotifyIcon className="h-8 w-8 fill-zinc-500 mr-1" />
      <p className="font-medium text-zinc-300">Not Playing</p>
      <p className="font-normal inline-block">—</p>
      <p className="font-normal text-sm inline-block">Spotify</p>
    </div>
  </div>
);

export default async function CurrentlyPlaying() {
  const data = await getCurrentlyPlaying();

  return (
    <div className="w-full flex flex-col justify-center items-center py-8">
      <div className="flex items-center p-4 rounded-xl bg-zinc-800 border-2 border-zinc-700 min-w-full md:min-w-[50%]">
        {!data && <NotPlaying />}
        {data && !isTrackObjectFull(data.item) && <NotPlaying />}
        {data && isTrackObjectFull(data.item) && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
}
