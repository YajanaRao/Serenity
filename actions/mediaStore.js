import  RNAndroidAudioStore from 'react-native-get-music-files';
import _ from 'lodash';

export const updateQuery = (query) => dispatch => {
    if(query){
      RNAndroidAudioStore.search({ searchParam: query }).then((media) => {
        _.map(media, function (item) {
          item.url = "file://" + item.path
          if (!item.id) {
            item.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
          }
          delete item.path
          item.artwork = 'https://source.unsplash.com/collection/574198/120x120'
          return item
        });
        dispatch({
          type: 'UPDATE_QUERY',
          payload: media,
          // query: query
        });
      })
      .catch((error) => {
        console.log(error)
      })
    }
    dispatch({
      type: 'UPDATE_QUERY',
      payload: [],
      // query: query
    });
}

export const getOfflineSongs = () => dispatch => {
  RNAndroidAudioStore.getAll({})
    .then(media => {
      _.map(media, function (item) {
        if (!item.id) {
          item.id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        }
        item.url = "file://" + item.path

        
        delete item.path
        return item
      });
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: media
      })
    })
    .catch(er => {
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong'
      })
    });
}
  
export const getOfflineArtists = () => dispatch => {
  RNAndroidAudioStore.getArtists({})
    .then(media => {
      dispatch({
        type: 'OFFLINE_ARTISTS',
        payload: media
      })
    })
    .catch(er => {
        dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong'
      })
    });
}

export const getOfflineAlbums = () => dispatch => {
  RNAndroidAudioStore.getAlbums({})
  .then(media => {
    dispatch({
      type: 'OFFLINE_ALBUMS',
      payload: media
    })
  })
  .catch(er => {
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong'
      })
  });
}

export const filterArtistSongs = (artist,image) => dispatch => {
  RNAndroidAudioStore.getSongs({
    artist: artist
  })
    .then(media => {
      _.map(media, function (item) {
        item.url = "file://" + item.path
        delete item.path
        item.artwork = image
        return item
      });
      dispatch({
        type: 'OFFLINE_FILES',
        payload: media
      });
    })
    .catch(er => console.log(er));
}

export const filterAlbumSongs = (album,image) => dispatch => {
  RNAndroidAudioStore.getSongs({
    album: album
  })
    .then(media => {
      _.map(media, function (item) {
        item.url = "file://" + item.path
        delete item.path
        item.artwork = image
        return item
      });
      dispatch({
        type: 'OFFLINE_FILES',
        payload: media
      });
    })
    .catch(er => console.log(er));
} 