import { getAccessToken } from "lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = await getAccessToken();

  const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    res.status(500).json({ error: response.statusText });
    return;
  }

  const data: SpotifyApi.UsersTopArtistsResponse = await response.json();

  const artists: ArtistReponse[] = data.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image_url: artist.images[0].url,
    uri: artist.uri,
    followers_count: artist.followers.total,
  }));

  res.status(200).json(artists);
}
