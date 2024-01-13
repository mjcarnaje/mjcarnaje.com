import { NextApiRequest, NextApiResponse } from "next";

const { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, BASE_URL } = process.env;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { code } = req.query;

  const base64STR = Buffer.from(
    `${SPOTIFY_CLIENT_ID}:${SPOTIFY_CLIENT_SECRET}`
  ).toString("base64");

  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${base64STR}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code as string,
      redirect_uri: `${BASE_URL}/api/spotify/refresh-token`,
    }),
  });

  if (!response.ok) {
    res.status(500).json({ error: response.statusText });
  }

  const { refresh_token } = await response.json();

  res.status(200).json({ refresh_token });
}
