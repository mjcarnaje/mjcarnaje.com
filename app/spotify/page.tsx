import { Container, TopArtists, TopTracks } from "@components";
import { CurrentlyPlaying } from "@components/spotify/CurrentlyPlaying";
import { Profile } from "@components/spotify/Profile";
import { getAccessToken } from "lib/spotify";

async function getTopArtists(): Promise<ArtistReponse[]> {
  const access_token = await getAccessToken();
  const response = await fetch("https://api.spotify.com/v1/me/top/artists", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  const data: SpotifyApi.UsersTopArtistsResponse = await response.json();

  const artists: ArtistReponse[] = data.items.map((artist) => ({
    id: artist.id,
    name: artist.name,
    image_url: artist.images[0].url,
    uri: artist.uri,
    followers_count: artist.followers.total,
  }));

  return artists;
}
async function getTopTracks(): Promise<TrackReponse[]> {
  const access_token = await getAccessToken();
  const response = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
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
async function getMe(): Promise<SpotifyApi.UserProfileResponse> {
  const access_token = await getAccessToken();
  const response = await fetch("https://api.spotify.com/v1/me", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
}
async function getCurrentlyPlaying(): Promise<
  SpotifyApi.CurrentlyPlayingResponse | { is_playing: false }
> {
  const access_token = await getAccessToken();
  const response = await fetch(
    "https://api.spotify.com/v1/me/player/currently-playing",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: "no-store",
    }
  );
  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }
  return response.json();
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
