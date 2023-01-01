import { Container, TopArtists, TopTracks } from "@components";
import { CurrentlyPlaying } from "@components/spotify/CurrentlyPlaying";
import { Profile } from "@components/spotify/Profile";
import { BASE_URL } from "@constants";

async function getTopArtists(): Promise<ArtistReponse[]> {
  const res = await fetch(`${BASE_URL}/api/spotify/top-artists`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getTopTracks(): Promise<TrackReponse[]> {
  const res = await fetch(`${BASE_URL}/api/spotify/top-tracks`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getMe(): Promise<SpotifyApi.UserProfileResponse> {
  const res = await fetch(`${BASE_URL}/api/spotify/me`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}
async function getCurrentlyPlaying(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
  const res = await fetch(`${BASE_URL}/api/spotify/currently-playing`);
  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }
  return res.json();
}

export default async function Spotify() {
  const [topArtists, topTracks, me, currentlyPlaying] = await Promise.all([
    getTopArtists(),
    getTopTracks(),
    getMe(),
    getCurrentlyPlaying(),
  ]);

  return (
    <Container className="my-24">
      <div className="pb-12 flex flex-col gap-8">
        <Profile data={me} />
        <CurrentlyPlaying data={currentlyPlaying} />
      </div>
      <div className="flex gap-4 w-full">
        <TopArtists data={topArtists} />
        <TopTracks data={topTracks} />
      </div>
    </Container>
  );
}
