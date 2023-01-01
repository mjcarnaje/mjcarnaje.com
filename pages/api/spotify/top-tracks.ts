import { getAccessToken } from "lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = await getAccessToken();

  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    res.status(500).json({ error: response.statusText });
    return;
  }

  const data: SpotifyApi.UsersTopTracksResponse = await response.json();

  const tracks: TrackReponse[] = data.items.map((track) => ({
    id: track.id,
    title: track.name,
    artist: track.artists.map((artist) => artist.name).join(", "),
    url: track.external_urls.spotify,
    image_url: track.album.images[0].url,
    duration: track.duration_ms,
    album: track.album.name,
    uri: track.uri,
  }));

  res.status(200).json(tracks);
}
