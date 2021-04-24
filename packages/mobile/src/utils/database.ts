import values from 'lodash/values';
import { log } from './logging';
import { ArtistProps, AlbumProps, PlaylistProps, TrackProps } from './types';

export const deserializeSongs = (realmObject: TrackProps[]) => {
  try {
    return values(realmObject).map((item: TrackProps) => ({
      album: item.album,
      artist: item.artist,
      cover: item.cover,
      id: item.id,
      path: item.path,
      title: item.title,
    }));
  } catch (error) {
    log.error(`deserializeSongs`, error);
    return [];
  }
};

export const deserializeAlbums = (realmObject: AlbumProps[]) => {
  try {
    return values(realmObject).map((item: AlbumProps) => ({
      artist: item.artist,
      cover: item.cover,
      id: item.id,
      name: item.name,
    }));
  } catch (error) {
    log.error('deserializeAlbums', error);
    return [];
  }
};

export const deserializeArtists = (realmObject: ArtistProps[]) => {
  return values(realmObject).map((item: ArtistProps) => ({
    cover: item.cover,
    id: item.id,
    name: item.name,
  }));
};

export const deserializePlaylists = (realmObject: PlaylistProps[]) => {
  return values(realmObject).map((playlist: PlaylistProps) => ({
    id: playlist.id,
    name: playlist.name,
    owner: playlist.owner,
    songs: playlist.songs,
  }));
};
