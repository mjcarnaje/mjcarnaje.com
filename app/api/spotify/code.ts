import { generateRandomString } from "lib/misc";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const scopes = [
    "user-read-currently-playing",
    "user-top-read",
    "user-read-private",
    "user-read-email",
  ];

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope: scopes.join(" "),
        redirect_uri: `${process.env.BASE_URL}/api/spotify/refresh-token`,
        state: generateRandomString(16),
      })
  );
}
