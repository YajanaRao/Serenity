import values from 'lodash/values';
import log from './logging';

export const deserializeSongs = realmObject => {
  try {
    return values(realmObject).map(item => ({
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

export const deserializeAlbums = realmObject => {
  try {
    return values(realmObject).map(item => ({
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

export const deserializeArtists = realmObject => {
  try {
    return values(realmObject).map(item => ({
      id: item.id,
      name: item.name,
      cover: item.cover,
    }));
  } catch (error) {
    log(error);
    return [];
  }
};

export const deserializePlaylists = realmObject => {
  return values(realmObject).map(playlist => ({
    id: playlist.id,
    name: playlist.name,
    songs: playlist.songs,
    owner: playlist.owner,
  }));
};
