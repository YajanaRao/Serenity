import values from 'lodash/values';
import log from './logging';

export const deserializeSongs = realmObject => {
  try {
    return values(realmObject).map(item => ({
      id: item.id,
      title: item.title,
      artwork: item.artwork,
      artist: item.artist,
      album: item.album,
      url: item.url ? item.url : item.path,
    }));
  } catch (error) {
    log('deserializeSongs: ', error);
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
