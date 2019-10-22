import values from 'lodash/values';

import realm from '../database';

import { PLAYLIST_SCHEMA_NAME } from '../database/schema/PlaylistSchema';
import { SONG_SCHEMA_NAME } from '../database/schema/SongSchema';
import { ARTIST_SCHEMA_NAME } from '../database/schema/ArtistSchema';
import { ALBUM_SCHEMA_NAME } from '../database/schema/AlbumSchema';

export const userPlaylistIdPrefix = 'user-playlist--';
export const userSongIdPrefix = 'user-song--';
export const artistIdPrefix = 'artist--';
export const albumIdPrefix = 'album--';

const generateId = () => {
  const playlists = realm.objects(PLAYLIST_SCHEMA_NAME).sorted('id', true);
  let max = 1;
  if (playlists.length > 0) {
    max = parseInt(playlists[0].id.split(userPlaylistIdPrefix)[1], 10) + 1;
  }
  // The user can create a max of 100000 playlists :)
  return `${userPlaylistIdPrefix}${max.toString().padStart(6, '0')}`;
};

const generateSongId = () => {
  const songs = realm.objects(SONG_SCHEMA_NAME).sorted('id', true);
  let max = 1;
  if (songs.length > 0) {
    max = parseInt(songs[0].id.split(userSongIdPrefix)[1], 10) + 1;
  }
  // The user can create a max of 100000 playlists :)
  return `${userSongIdPrefix}${max.toString().padStart(6, '0')}`;
};

const generateArtistId = () => {
  const artists = realm.objects(ARTIST_SCHEMA_NAME).sorted('id', true);
  let max = 1;
  if (artists.length > 0) {
    max = parseInt(artists[0].id.split(artistIdPrefix)[1], 10) + 1;
  }
  return `${artistIdPrefix}${max.toString().padStart(6, '0')}`;
};

const generateAlbumId = () => {
  const albums = realm.objects(ALBUM_SCHEMA_NAME).sorted('id', true);
  let max = 1;
  if (albums.length > 0) {
    max = parseInt(albums[0].id.split(albumIdPrefix)[1], 10) + 1;
  }
  return `${albumIdPrefix}${max.toString().padStart(6, '0')}`;
};

export const defaultDBSetup = () => {
  realm.write(() => {
    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: `${userPlaylistIdPrefix}000001`,
      name: 'Recently Played',
      owner: 'Serenity',
    });

    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: `${userPlaylistIdPrefix}000002`,
      name: 'Favorite',
      owner: 'Serenity',
    });

    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: `${userPlaylistIdPrefix}000003`,
      name: 'Queue',
      owner: 'Serenity',
    });
  });
};

export const getAllPlaylists = () => {
  return realm.objects(PLAYLIST_SCHEMA_NAME);
};

export const getQueuedSongs = () => {
  try {
    const queue = realm.objectForPrimaryKey(
      PLAYLIST_SCHEMA_NAME,
      'user-playlist--000003',
    );
    if (queue !== undefined) {
      return queue.songs;
    }
    return [];
  } catch (error) {
    console.log('getQueuedSongs: ', error);
  }
};

export const getPlayedSongs = () => {
  try {
    const history = realm.objectForPrimaryKey(
      PLAYLIST_SCHEMA_NAME,
      'user-playlist--000001',
    );
    if (history !== undefined) {
      return history.songs;
    }
    return [];
  } catch (error) {
    console.log('getPlayedSongs: ', error);
    return [];
  }
};

export const createPlaylist = playlistName => {
  realm.write(() => {
    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: generateId(),
      name: playlistName,
      owner: 'You',
    });
  });
  return true;
};

export const removeSong = (id, song) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      const item = playlist.songs.filtered(`id = $0`, song.id);
      realm.delete(item);
    });
  } catch (error) {
    console.log('removeSong: ', error);
  }
};

export const addSong = (id, songs) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      if (Array.isArray(songs)) {
        songs.forEach(song => {
          const url = song.url ? song.url : song.path;
          if (url !== undefined) {
            playlist.songs.push({
              id: generateSongId(),
              title: song.title,
              artwork: song.artwork,
              artist: song.artist,
              album: song.album,
              url,
            });
          }
        });
      } else {
        const url = songs.url ? songs.url : songs.path;
        playlist.songs.push({
          id: generateSongId(),
          title: songs.title,
          artwork: songs.artwork,
          artist: songs.artist,
          album: songs.album,
          url,
        });
      }
    });
  } catch (error) {
    console.log('addSong: ', error, songs);
  }
};

export const clearAllSongs = id => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      realm.delete(playlist.songs);
    });
  } catch (error) {
    console.log('clearAllSongs: ', error);
  }
};

export const deletePlaylist = id => {
  realm.write(() => {
    const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
    console.log(playlist);
    realm.delete(playlist);
  });
};

export const renamePlaylist = (id, playlistName) => {
  realm.write(() => {
    realm.create(
      PLAYLIST_SCHEMA_NAME,
      {
        id,
        name: playlistName,
      },
      true,
    );
  });
};

export const addArtist = artists => {
  realm.write(() => {
    if (Array.isArray(artists)) {
      artists.forEach(artist => {
        realm.create(ARTIST_SCHEMA_NAME, {
          id: generateArtistId(),
          name: artist.name,
          cover: artist.cover,
        });
      });
    } else {
      realm.create(ARTIST_SCHEMA_NAME, {
        id: generateArtistId(),
        name: artists.name,
        cover: artists.cover,
      });
    }
  });
};

export const addAlbum = album => {
  realm.write(() => {
    realm.create(ALBUM_SCHEMA_NAME, {
      id: generateAlbumId(),
      name: album.name,
      cover: album.cover,
      artist: album.artist,
    });
  });
};

export const getArtists = () => {
  try {
    return values(realm.objects(ARTIST_SCHEMA_NAME));
  } catch (error) {
    console.debug('getArtists: ', error);
    return [];
  }
};

export const getAlbums = () => {
  try {
    return realm.objects(ALBUM_SCHEMA_NAME);
  } catch (error) {
    console.debug('getAlbums: ', error);
    return [];
  }
};
