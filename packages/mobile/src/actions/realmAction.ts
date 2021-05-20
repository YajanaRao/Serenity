import find from 'lodash/find';
import realm from '../database';

import { PLAYLIST_SCHEMA_NAME } from '../database/schema/PlaylistSchema';
import { ARTIST_SCHEMA_NAME } from '../database/schema/ArtistSchema';
import { ALBUM_SCHEMA_NAME } from '../database/schema/AlbumSchema';
import { TrackProps, ArtistProps, AlbumProps } from '../utils/types';
import { log } from '../utils/logging';
import { FAVORITES_PLAYLIST_ID, HISTORY_PLAYLIST_ID, QUEUE_ID } from '../database/consts';

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
  const r = Math.random()
    .toString(36)
    .substring(7);
  return `${userSongIdPrefix}${r}`;
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

    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: `${userPlaylistIdPrefix}000004`,
      name: 'Downloads',
      owner: 'Serenity',
    });
  });
};

export const getAllPlaylists = () => {
  return realm.objects(PLAYLIST_SCHEMA_NAME);
};

export const getUserPlaylists = () => {
  const playlists = realm.objects(PLAYLIST_SCHEMA_NAME);
  const userPlaylists = playlists.filtered('owner = "You"');
  return userPlaylists;
};

export const getPlaylist = (id: string) => {
  try {
    const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
    return playlist;
  } catch (error) {
    log.error(`getPlaylist`, error);
    return [];
  }
};

export const getPlaylistSongs = (id: string) => {
  try {
    const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
    if (playlist !== undefined) {
      return playlist.songs;
    }
    return undefined;
  } catch (error) {
    log.error(`getPlaylistSongs`, error);
    return undefined;
  }
};

export const getQueuedSongs = () => {
  try {
    const queue = realm.objectForPrimaryKey(
      PLAYLIST_SCHEMA_NAME,
      QUEUE_ID,
    );
    if (queue !== undefined) {
      return queue.songs;
    }
    return undefined;
  } catch (error) {
    log.error(`getQueuedSongs`, error);
    return undefined;
  }
};

export const getPlayedSongs = () => {
  try {
    const history = realm.objectForPrimaryKey(
      PLAYLIST_SCHEMA_NAME,
      HISTORY_PLAYLIST_ID,
    );
    if (history !== undefined) {
      return history.songs;
    }
    return undefined;
  } catch (error) {
    log.error(`getPlayedSongs`, error);
    return undefined;
  }
};


export const createPlaylist = (playlistName: string) => {
  realm.write(() => {
    realm.create(PLAYLIST_SCHEMA_NAME, {
      id: generateId(),
      name: playlistName,
      owner: 'You',
    });
  });
  return true;
};

export const removeSong = (id: string, song: TrackProps) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      const item = playlist.songs.filtered(`id = $0`, song.id);
      realm.delete(item);
    });
  } catch (error) {
    log.error(`removeSong`, error);
  }
};

export const unshiftSong = (id: string, song: TrackProps) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      if (playlist) {
        playlist.songs.unshift({
          id: generateSongId(),
          title: song.title,
          cover: song.cover,
          artist: song.artist,
          album: song.album,
          path: song.path,
        });
      }
    });
  } catch (error) {
    log.error('unshiftSong', error);
  }
};

export const addSong = (
  id: string,
  song: TrackProps,
  unique: boolean = false,
) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      if (playlist !== undefined) {
        playlist.songs.push({
          id: unique ? song.id : generateSongId(),
          title: song.title,
          cover: song.cover,
          artist: song.artist,
          album: song.album,
          path: song.path,
        });
      }
    });
  } catch (error) {
    log.error(`addSong`, error);
  }
};

export const clearAllSongs = (id: string) => {
  try {
    realm.write(() => {
      const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
      if (playlist) {
        realm.delete(playlist.songs);
      }
    });
  } catch (error) {
    log.error(`clearAllSongs`, error);
  }
};

export const isSongPresent = (id: string) => {
  const playlist = realm.objectForPrimaryKey(
    PLAYLIST_SCHEMA_NAME,
    FAVORITES_PLAYLIST_ID,
  );
  return find(playlist.songs, { id });
};

export const deletePlaylist = (id: string) => {
  realm.write(() => {
    const playlist = realm.objectForPrimaryKey(PLAYLIST_SCHEMA_NAME, id);
    realm.delete(playlist);
  });
};

export const renamePlaylist = (id: string, playlistName: string) => {
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

export const addArtist = (artist: ArtistProps) => {
  try {
    realm.write(() => {
      realm.create(ARTIST_SCHEMA_NAME, {
        id: artist.id,
        name: artist.artist,
        cover: artist.cover,
      });
    });
  } catch (error) {
    log.error('addArtist', 'artist with same id is already present');
  }
};

export const removeArtist = (id: string) => {
  realm.write(() => {
    const artistObject = realm.objectForPrimaryKey(
      ARTIST_SCHEMA_NAME,
      id.toString(),
    );
    if (artistObject) {
      realm.delete(artistObject);
    }
  });
};

export const isArtistPresent = (id: string) => {
  const artist = realm.objectForPrimaryKey(ARTIST_SCHEMA_NAME, id);
  return !!artist;
};

export const addAlbum = (album: AlbumProps) => {
  try {
    realm.write(() => {
      realm.create(ALBUM_SCHEMA_NAME, {
        id: album.id.toString(),
        name: album.album,
        cover: album.cover,
        artist: album.artist,
      });
    });
  } catch (error) {
    log.error(album.toString(), error);
  }
};

export const removeAlbum = (id: string) => {
  realm.write(() => {
    const albumObject = realm.objectForPrimaryKey(
      ALBUM_SCHEMA_NAME,
      id.toString(),
    );
    realm.delete(albumObject);
  });
};

export const isAlbumPresent = (id: string) => {
  const album = realm.objectForPrimaryKey(ALBUM_SCHEMA_NAME, id);
  if (album) {
    return true;
  }
  return false;
};

export const getArtists = () => {
  try {
    return realm.objects(ARTIST_SCHEMA_NAME);
  } catch (error) {
    log.error(`getArtists`, error);
    return [];
  }
};

export const getAlbums = () => {
  try {
    return realm.objects(ALBUM_SCHEMA_NAME);
  } catch (error) {
    log.error(`getAlbums`, error);
    return [];
  }
};
