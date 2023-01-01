interface TrackReponse {
  id: string;
  title: string;
  artist: string;
  url: string;
  image_url: string;
  duration: number;
  album: string;
  uri: string;
}

interface ArtistReponse {
  id: string;
  name: string;
  image_url: string;
  uri: string;
  followers_count: number;
}
