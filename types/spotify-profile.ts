export interface TrackReponse {
  id: string;
  title: string;
  artist: string;
  url: string;
  image_url: string;
  duration: number;
  album: string;
  uri: string;
}

export interface ArtistReponse {
  id: string;
  name: string;
  image_url: string;
  uri: string;
  followers_count: number;
}

export enum TimeRange {
  short_term = "short_term",
  medium_term = "medium_term",
  long_term = "long_term",
}
