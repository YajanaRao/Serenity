import values from 'lodash/values';
import { log } from './logging';
import { ArtistProps, AlbumProps, PlaylistProps, TrackProps } from '../types';

export const deserializeSongs = (realmObject: TrackProps[]) => {
  try {
    return values(realmObject).map((item: TrackProps) => ({
      id: item.id,
      title: item.title,
      cover: item.cover,
      artist: item.artist,
      album: item.album,
      path: item.path,
    }));
  } catch (error) {
    log(`deserializeSongs: ${error}`);
    return [];
  }
};

export const deserializeAlbums = (realmObject: AlbumProps[]) => {
  try {
    return values(realmObject).map((item: AlbumProps) => ({
      id: item.id,
      name: item.name,
      cover: item.cover,
      artist: item.artist,
    }));
  } catch (error) {
    log(error);
    return [];
  }
};

export const deserializeArtists = (realmObject: ArtistProps[]) => {
  return values(realmObject).map((item: ArtistProps) => ({
    id: item.id,
    name: item.name,
    cover: item.cover,
  }));
};

export const deserializePlaylists = (realmObject: PlaylistProps[]) => {
  return values(realmObject).map((playlist: PlaylistProps) => ({
    id: playlist.id,
    name: playlist.name,
    songs: playlist.songs,
    owner: playlist.owner,
  }));
};
