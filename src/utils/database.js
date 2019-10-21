import values from 'lodash/values';

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
    console.log('deserializeSongs: ', error);
  }
};

export const deserializePlaylists = realmObject => {
  return values(realmObject);
};
