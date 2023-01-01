import { Container, TopArtists, TopTracks } from "@components";
import { CurrentlyPlaying } from "@components/spotify/CurrentlyPlaying";
import { Profile } from "@components/spotify/Profile";
import { BASE_URL } from "@constants";

async function getTopArtists(): Promise<ArtistReponse[]> {
  return fetch(`${BASE_URL}/api/spotify/top-artists`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getTopTracks(): Promise<TrackReponse[]> {
  return fetch(`${BASE_URL}/api/spotify/top-tracks`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getMe(): Promise<SpotifyApi.UserProfileResponse> {
  return fetch(`${BASE_URL}/api/spotify/me`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getCurrentlyPlaying(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
  return fetch(`${BASE_URL}/api/spotify/currently-playing`)
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
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
