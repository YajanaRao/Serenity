import RNAndroidAudioStore from 'react-native-get-music-files';
import groupBy from 'lodash/groupBy';
import values from 'lodash/values';
import orderBy from 'lodash/orderBy';

import { log } from '../utils/logging';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const updateQuery = (query: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  if (query) {
    RNAndroidAudioStore.search({ searchParam: query })
      .then(media => {
        dispatch({
          type: 'UPDATE_QUERY',
          payload: media,
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

export const getOfflineSongs = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
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

export const getOfflineArtists = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
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

export const getOfflineAlbums = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
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
      return media;
    })
    .catch(er => log(er));
  return songs;
};

export const findArtistSongs = async (artist: string) => {
  const songs = await RNAndroidAudioStore.getSongs({
    artist,
  })
    .then(media => {
      return media;
    })
    .catch(er => log(er));
  return songs;
};

export const filterSongsByGenre = async genre => {
  const songs = await RNAndroidAudioStore.getSongsByGenres({ genre })
    .then(media => {
      return media;
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
