import { Container, TopArtists, TopTracks } from "@components";
import { CurrentlyPlaying } from "@components/spotify/CurrentlyPlaying";
import { Profile } from "@components/spotify/Profile";

async function getTopArtists(): Promise<ArtistReponse[]> {
  return fetch("http://localhost:3000/api/spotify/top-artists")
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getTopTracks(): Promise<TrackReponse[]> {
  return fetch("http://localhost:3000/api/spotify/top-tracks")
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getMe(): Promise<SpotifyApi.UserProfileResponse> {
  return fetch("http://localhost:3000/api/spotify/me")
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}
async function getCurrentlyPlaying(): Promise<SpotifyApi.CurrentlyPlayingResponse> {
  return fetch("http://localhost:3000/api/spotify/currently-playing")
    .then((res) => res.json())
    .catch(() => {
      throw new Error("Failed to fetch data");
    });
}

export default async function Spotify() {
  const topArtists = await getTopArtists();
  const me = await getMe();
  const topTracks = await getTopTracks();
  const currentlyPlaying = await getCurrentlyPlaying();

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
