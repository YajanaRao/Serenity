import RNAndroidAudioStore from 'react-native-get-music-files';
import map from 'lodash/map';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';

import { log } from '../utils/logging';
import { TrackProps } from '../types';

function formatter(media: TrackProps[]) {
  return map(media, (item: TrackProps) => {
    const song: any = {};
    song.path = item.path;
    song.id = item.id;
    song.title = item.title;
    song.album = item.album;
    song.artist = item.artist;
    song.cover = item.cover;
    return song;
  });
}

export const updateQuery = (query: string) => dispatch => {
  if (query) {
    RNAndroidAudioStore.search({ searchParam: query })
      .then(media => {
        dispatch({
          type: 'UPDATE_QUERY',
          payload: formatter(media),
          // query: query
        });
      })
      .catch(error => {
        log(error);
      });
  } else {
    dispatch({
      type: 'UPDATE_QUERY',
      payload: false,
      // query: query
    });
  }
};

export const getOfflineSongs = () => dispatch => {
  RNAndroidAudioStore.getAll({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: media,
      });
    })
    .catch(er => {
      log(er);
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: [],
      });
    });
};

export const getOfflineArtists = () => dispatch => {
  RNAndroidAudioStore.getArtists({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_ARTISTS',
        payload: media,
      });
    })
    .catch(er => {
      log(er);
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong',
      });
    });
};

export const getOfflineAlbums = () => dispatch => {
  RNAndroidAudioStore.getAlbums({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_ALBUMS',
        payload: media,
      });
    })
    .catch(er => {
      log(er);
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong',
      });
    });
};

export const findAlbumSongs = async (album: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    album,
  })
    .then(media => {
      return formatter(media);
    })
    .catch(er => log(er));
  return songs;
};

export const findArtistSongs = async (artist: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    artist,
  })
    .then(media => {
      return formatter(media);
    })
    .catch(er => log(er));
  return songs;
};

export const filterSongsByGenre = async genre => {
  const songs = await RNAndroidAudioStore.getSongsByGenres({ genre })
    .then(media => {
      return formatter(media);
    })
    .catch(error => log(error));
  return songs;
};

export const mostPlayedSongs = (array: []) => {
  return orderBy(
    values(groupBy(array, 'title')).map(group => ({
      ...group[0],
      count: group.length,
    })),
  );
};
