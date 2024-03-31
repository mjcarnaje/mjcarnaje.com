import { Container } from "@/components";
import { TimeRange, TrackReponse } from "@/types/spotify-profile";
import { getAccessToken } from "lib/spotify";
import { Tracks } from "./Tracks";

async function getTopTracks(time_range: TimeRange): Promise<TrackReponse[]> {
  const access_token = await getAccessToken();
  const response = await fetch(
    `https://api.spotify.com/v1/me/top/tracks?time_range=${time_range}&limit=50`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
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
  return tracks;
}

export default async function SpotifyTopTracks() {
  const [long_term, medium_term, short_term] = await Promise.all([
    getTopTracks(TimeRange.long_term),
    getTopTracks(TimeRange.medium_term),
    getTopTracks(TimeRange.short_term),
  ]);
  return (
    <Container className="my-24">
      <div className="flex flex-col w-full gap-24 lg:flex-row lg:gap-16">
        <Tracks data={{ long_term, medium_term, short_term }} />
      </div>
    </Container>
  );
}
