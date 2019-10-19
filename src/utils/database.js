import values from 'lodash/values';

export const deserializeSongs = realmObject => {
  return values(realmObject).map(item => ({
    id: item.id,
    title: item.title,
    artwork: item.artwork,
    artist: item.artist,
    album: item.album,
  }));
};

export const deserializePlaylists = realmObject => {
    return values(realmObject);
}