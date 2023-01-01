import { generateRandomString } from "lib/misc";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  _req: NextApiRequest,
  res: NextApiResponse
) {
  const scopes = ["user-read-currently-playing", "user-top-read"];

  res.redirect(
    "https://accounts.spotify.com/authorize?" +
      new URLSearchParams({
        response_type: "code",
        client_id: process.env.SPOTIFY_CLIENT_ID as string,
        scope: scopes.join(" "),
        redirect_uri: "http://localhost:3000/api/spotify/callback",
        state: generateRandomString(16),
      })
  );
}
