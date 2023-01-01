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
      code: "AQAnJiFvi4a1_geeW2FZIm-ujjQMyru3I3Jh1ZwgBPHC5FzcsyimAvlS_f7zKaPJDd21DpmTHkJWr4Y_eWR5mbUcXmjOZF3lMdprcjbZBTUBDEkVwSnP0MTDl_UrN43MJc4mFu5GaUrQg-jsWDGgNHRw2wHfanrZ-eNgzt4EOlyDwI3yavnKA6GWsxAXp-Jv27K7XPhXOIW2oETvaIsgpi_JF-aiJD0-ObpNhsFie4xTuqkUzrubuOab",
      redirect_uri: "http://localhost:3000/api/spotify/callback",
    }),
  });

  const { refresh_token } = await response.json();

  res.status(200).json({ refresh_token });
}
