import RNAndroidAudioStore from 'react-native-get-music-files';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import log from '../utils/logging';

export const updateQuery = query => {
  return async dispatch => {
    if (query) {
      const media = await RNAndroidAudioStore.search({ searchParam: query })
        .then(songs => {
          return map(songs, item => {
            item.url = item.path;
            delete item.path;
            return item;
          });
        })
        .catch(error => {
          log(error);
        });

      if (isEmpty(media)) {
        dispatch({
          type: 'UPDATE_QUERY',
          payload: [],
        });
      } else {
        dispatch({
          type: 'UPDATE_QUERY',
          payload: media,
        });
      }
    } else {
      dispatch({
        type: 'UPDATE_QUERY',
        payload: false,
      });
    }
  };
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

export const findAlbumSongs = async album => {
  const songs = await RNAndroidAudioStore.getSongs({
    album,
  })
    .then(media => {
      return map(media, item => {
        item.url = item.path;
        delete item.path;
        return item;
      });
    })
    .catch(er => log(er));
  return songs;
};

export const findArtistSongs = async artist => {
  const songs = await RNAndroidAudioStore.getSongs({
    artist,
  })
    .then(media => {
      return map(media, item => {
        item.url = item.path;
        delete item.path;
        return item;
      });
    })
    .catch(er => log(er));
  return songs;
};
