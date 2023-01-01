import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic NGYwYjlkYzA3MzJmNGNlNmI2ZTM1MjQ5Mzk1ZWJiYTI6YzUzMTgxZTBmMjBjNGNkOThiOGU0NzZlMTM2NTc0Zjg=",
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: "AQCPKebt9GUbdy_JkK5mZsPDVDUBHm_L6sJrsyYJlwD8_6utxisQMji96RHelT_Equ-fNqGS4GRiTFm4Rffaym9wg6AF-PQ-9fYceZeWrH0SFbUEMyEigP7MGWDP0KvTSlavrsLWcM3rLz5QFdYx-wlsr3GxPBcjwoc-w3iVd_LDKxmrKCiYfBOsLs4CB2oJEnLzc5L4xbXaYLWyDLquDH91S4PAC7VTCPb0wGg9X89Wy29GJfOefYJB",
      redirect_uri: "http://localhost:3000/api/spotify/callback",
    }),
  });

  if (!response.ok) {
    res.status(500).json({ error: response.statusText });
  }

  const { refresh_token } = await response.json();

  res.status(200).json({ refresh_token });
}
