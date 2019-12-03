export interface TrackProps {
  id: string;
  cover: string;
  title: string;
  artist?: string;
  path: string;
  album?: string;
}

export interface AlbumProps {
  id: string;
  album: string;
  cover?: string;
  artist?: string;
}

export interface ArtistProps {
  id: string;
  name: string;
  cover?: string;
  artist?: string;
}
