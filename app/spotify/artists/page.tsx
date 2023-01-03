import { Container } from "@components";
import { ArtistReponse, TimeRange } from "@typings/spotify-profile";
import { getAccessToken } from "lib/spotify";
import { Artists } from "./Artists";

async function getTopArtists(time_range: TimeRange): Promise<ArtistReponse[]> {
  const access_token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/artists?time_range=${time_range}&limit=50`,
    {
      method: "GET",
      headers: { Authorization: `Bearer ${access_token}` },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: SpotifyApi.UsersTopArtistsResponse = await response.json();

  const artists: ArtistReponse[] = data.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image_url: artist.images[0].url,
    uri: artist.external_urls.spotify,
    followers_count: artist.followers.total,
  }));

  return artists;
}

export default async function SpotifyTopArtists() {
  const [long_term, medium_term, short_term] = await Promise.all([
    getTopArtists(TimeRange.long_term),
    getTopArtists(TimeRange.medium_term),
    getTopArtists(TimeRange.short_term),
  ]);

  return (
    <Container className="my-24">
      <div className="flex flex-col lg:flex-row gap-24 lg:gap-16 w-full">
        <Artists data={{ long_term, medium_term, short_term }} />
      </div>
    </Container>
  );
}
