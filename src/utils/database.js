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
    return false;
  }
};

export const deserializePlaylists = realmObject => {
  return values(realmObject);
};
