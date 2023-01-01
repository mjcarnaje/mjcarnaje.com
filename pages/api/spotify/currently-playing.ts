import { getAccessToken } from "lib/spotify";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const access_token = await getAccessToken();

  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );

  if (response.status === 204 || response.status > 400) {
    return res.status(200).json({ is_playing: false });
  }

  const data = await response.json();

  if (!data) {
    return res.status(200).json({ is_playing: false });
  }

  res.status(200).json(data);
}
