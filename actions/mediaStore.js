import  RNAndroidAudioStore from 'react-native-get-music-files';
import map from 'lodash/map';

export const updateQuery = (query) => dispatch => {
    if(query){
      RNAndroidAudioStore.search({ searchParam: query }).then((media) => {
        map(media, function (item) {
          item.url = "file://" + item.path
          item.id = item.path
          delete item.path
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
      dispatch({
        type: 'OFFLINE_SONGS',
        payload: media
      })
    })
    .catch(er => {
      console.log(er)
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
      map(media, function (item) {
        item.id = item.path
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
      map(media, function (item) {
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