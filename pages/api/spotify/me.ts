import { getAccessToken } from "lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = await getAccessToken();

  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  if (!response.ok) {
    res.status(500).json({ error: response.statusText });
    return;
  }

  const data: SpotifyApi.UserProfileResponse = await response.json();

  res.status(200).json(data);
}
