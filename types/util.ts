//  TrackObjectFull | EpisodeObject | null;

export function isTrackObjectFull(
  track: SpotifyApi.CurrentlyPlayingResponse["item"]
): track is SpotifyApi.TrackObjectFull {
  return (track as SpotifyApi.TrackObjectFull)?.album !== undefined;
}
