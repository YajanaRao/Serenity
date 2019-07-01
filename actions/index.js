import { DarkTheme, DefaultTheme } from 'react-native-paper';
import TrackPlayer from 'react-native-track-player';
import _ from 'lodash';
import * as RNFS from 'react-native-fs'; 
import MusicFiles from 'react-native-get-music-files';

export const updateQuery = (query) => dispatch => {
  dispatch({
    type: 'UPDATE_QUERY',
    payload: query
  });
}

export const updateTheme = (theme) => dispatch => {
  let Theme = (theme === DarkTheme ? DefaultTheme : DarkTheme);
  dispatch({
    type: 'UPDATE_THEME',
    payload: Theme
  })
}

const _downloadFileProgress = (data) => {
  const percentage = ((100 * data.bytesWritten) / data.contentLength) | 0;
  const text = `Progress ${percentage}%`;
  if (percentage == 100) {
  }
}


export const downloadMedia = (item) => dispatch => {
  try {
    if(item){
      RNFS.downloadFile({
        fromUrl: item.url,
        toFile: `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`,
        progress: (data) => _downloadFileProgress(data),
      }).promise.then(() => {
        dispatch({
          type: 'DOWNLOAD',
          payload: [{
            title: item.title,
            url: `${RNFS.DocumentDirectoryPath}/${item.title}.mp3`,
            artwork: "https://raw.githubusercontent.com/YajanaRao/Serenity/master/assets/icons/app-icon.png",
            artist: "Serenity"
          }]
        })
      })
    }
  } catch (error) {
  }
}

export const getOfflineMedia =  () => dispatch => {
  let response = []
  MusicFiles.getAll({
    // blured: false, // works only when 'cover' is set to true
    artist: true,
    duration: true, //default : true
    cover: true, //default : true,
    genre: true,
    title: true,
    cover: true,
    // minimumSongDuration: 10000, // get songs bigger than 10000 miliseconds duration,
    fields: ['title', 'albumTitle', 'genre', 'lyrics', 'artwork', 'duration'] // for iOs Version
  }).then(tracks => {
    if(_.isArray(tracks)){
      _.forEach(tracks, function (track) {
        if(!track.title){
          track.title = track.fileName.split('.')[0];
        }
        if(!track.album){
          track.album = "Local files"
        }
        if(!track.artist){
          if (!track.author){
            track.artist = "Unknown artist"
          }else {
            track.artist = track.author
          }
        }
        if(!track.cover){
          track.cover = "https://source.unsplash.com/collection/574198/200x200"
        }
        response.push({
          id: `file:/${track.path}`,
          title: track.title,
          url: `file://${track.path}`,
          album: track.album,
          artwork: track.cover,
          artist: track.artist
        })
      })
    }
    dispatch({
      type: 'OFFLINE',
      payload: response
    })
}).catch((error) => {
  dispatch({
    type: 'OFFLINE',
    payload: []
  })
})
  

  // RNFS.readdir(RNFS.DocumentDirectoryPath).then(files => {
  //   let response = []
  //   _.forEach(files, function (value) {
  //     if (_.endsWith(value, 'mp3')){
  //       RNFS.exists(RNFS.DocumentDirectoryPath + '/' + value).then(() => {
  //         response.push({
  //           id: `file:/${RNFS.DocumentDirectoryPath}/${value}`,
  //           title: value.split('.')[0],
  //           url: `file:/${RNFS.DocumentDirectoryPath}/${value}`,
  //           artwork: "https://raw.githubusercontent.com/YajanaRao/Serenity/master/assets/icons/app-icon.png",
  //           artist: "Serenity"
  //         })
  //       })
  //     }
  //   });
  //   dispatch({
  //     type: 'OFFLINE',
  //     payload: response
  //   })
  // })
  // .catch (err => {
  // });
}

export const previousMedia = () => dispatch => {
  dispatch({
    type: 'PREVIOUS'
  })
}

export const nextMedia = () => dispatch => {
  dispatch({
    type: 'NEXT'
  })
}

export const playMedia = (item) => dispatch => {
  if(item){
    TrackPlayer.getCurrentTrack().then((trackId) => {
      if (trackId != item.id) {
        TrackPlayer.skip(item.id).then(() => {
          TrackPlayer.play();
          dispatch({
            type: 'PLAY',
            payload: item
          })
        })
          .catch((error) => {
            TrackPlayer.add(item).then(() => {
              TrackPlayer.skip(item.id)
              .then(() => {
                TrackPlayer.play();
                dispatch({
                  type: 'PLAY',
                  payload: item
                })
              })
              .catch((error) => {
                dispatch({
                  type: 'NEXT'
                })
              })
            })
          })
      }
    })
    .catch((error) => {
      console.log(error)
    }) 
  }else {
    console.log("No data given")
  }
}

//  Favorite manangement
export const addToFavorite = (item) => dispatch => {
  if(!_.isUndefined(item)){
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: item
    })
  }
}

export const removeFromFavorite = (item) => dispatch => {
  dispatch({
    type: 'REMOVE_FROM_FAVORITE',
    payload: item
  })
}

export const addToQueue = (song) => dispatch => {
  TrackPlayer.getQueue().then((queue) => {
    let update = [];
    if(_.isArray(song)){
      update = _.differenceBy(song, queue, 'id');
    }
    else{
      update = _.differenceBy([song], queue, 'id');
    }
    if(!_.isEmpty(update)){
      TrackPlayer.add(update);
      TrackPlayer.play();
      dispatch({
        type: 'ADD_QUEUE',
        payload: _.concat(queue, update)
      })
    }
  })
  .catch((error) => {
    TrackPlayer.add(song);
    TrackPlayer.play();
  })
}

export const removeFromQueue = (song) => dispatch => {
  TrackPlayer.remove(song).then(() => {
    TrackPlayer.getQueue().then((queue) => {
      dispatch({
        type: 'UPDATE_QUEUE',
        payload: queue
      })
    })
    
  })
}

export const clearQueue = () => dispatch => {
  TrackPlayer.reset();
  dispatch({
    type: 'CLEAR_QUEUE',
    payload: []
  })  
}

export const activeTrackUpdate = (trackId) => dispatch => {
  TrackPlayer.getTrack(trackId)
    .then((track) => {
      if (track) {
        dispatch({
          type: 'ACTIVE_TRACK_UPDATE',
          payload: track
        })
      }
    })
}

export const fetchTopAlbums = () => dispatch => {
  fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_ALBUMS',
        payload: responseJson.albums.album
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchLastFMTopTracks = () => dispatch => {
  fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_TRACKS',
        payload: responseJson.toptracks.track
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchNapsterTopTracks = () => dispatch => {
  fetch('https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_TRACKS',
        payload: responseJson.tracks
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchLastFMTopArtists = () => dispatch => {
  fetch('http://ws.audioscrobbler.com/2.2/?method=chart.gettopartists&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_ARTISTS',
        payload: responseJson.artists.artist
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchNapsterTopArtists = () => dispatch => {
  fetch('https://api.napster.com/v2.2/artists/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_ARTISTS',
        payload: responseJson.artists
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchJioSavanData = (type) => dispatch => {
  try {
    fetch('https://www.jiosaavn.com/api.php?__call=content.getHomepageData')
      .then((response) => response.json())
      .then((responseJson) => {
        let response = responseJson._bodyInit.split("-->")[1]
        responseJson = JSON.parse(response.trim())
        if (type === "genres") {
          dispatch({
            type: 'JIO_SAVAN_GENRES',
            payload: responseJson.genres
          })
        }
        else if (type === "charts") {
          dispatch({
            type: 'JIO_SAVAN_CHARTS',
            payload: responseJson.charts
          })
        }
        else if (type === "new_albums") {
          dispatch({
            type: 'JIO_SAVAN_NEW_ALBUMS',
            payload: responseJson.new_albums
          })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  } catch (error) {
  }
}

export const fetchKannadaTopSongs = () => dispatch => {
  fetch('http://192.168.0.11:5000/api/songs/top/week')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'TOP_KANNADA',
        payload: responseJson
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchBillboardHot100 = () => dispatch => {
  fetch('http://192.168.0.11:5000/api/songs/top/billboard')
    .then((response) => response.json())
    .then((responseJson) => {
      dispatch({
        type: 'HOT_100',
        payload: responseJson.entries
      })
    })
    .catch((error) => {
      console.error(error);
    });
}

export const fetchNetInfo = () => dispatch => {
  dispatch({
    type: 'NET_INFO',
    payload: true
  })
  
}