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
  name?: string;
  album?: string;
  author?: string;
  cover?: string;
  artist?: string;
  numberOfSongs?: number;
}

export interface ArtistProps {
  id: string;
  name: string;
  cover?: string;
  artist?: string;
}

export interface NavigationScreenProps {
  navigation?: any;
  route?: any;
}

export interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
}
