export interface TrackProps {
  artist?: string;
  album?: string;
  cover: string;
  id: string;
  path: string;
  title: string;
  type?: string;
}

export interface AlbumProps {
  album?: string;
  artist?: string;
  author?: string;
  cover?: string;
  id: string;
  name?: string;
  numberOfSongs?: number;
}

export interface ArtistProps {
  artist?: string;
  cover?: string;
  id: string;
  name: string;
}

export interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
  songs?: TrackProps;
  cover?: string;
}
