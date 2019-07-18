import TrackPlayer from 'react-native-track-player';
import _ from 'lodash';


export const setUpTrackPlayer = () => dispatch => {
  try {
    TrackPlayer.setupPlayer({}).then(() => {
      TrackPlayer.updateOptions({
        stopWithApp: true,
        capabilities: [
          TrackPlayer.CAPABILITY_PLAY,
          TrackPlayer.CAPABILITY_PAUSE,
          TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
          TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
          TrackPlayer.CAPABILITY_SKIP
        ],
      });
    })
    TrackPlayer.addEventListener('playback-state', async (data) => {
      if (data.state == TrackPlayer.STATE_PLAYING) {
        dispatch({
          type: 'STATUS',
          payload: "playing"
        })
      }
      else if (data.state == TrackPlayer.STATE_BUFFERING) {
        dispatch({
          type: 'STATUS',
          payload: "loading"
        })
      }
      else {
        dispatch({
          type: 'STATUS',
          payload: "paused"
        })
      }
    });

    TrackPlayer.addEventListener('playback-track-changed', async (data) => {
      if (data.nextTrack) {
        TrackPlayer.getTrack(data.nextTrack)
          .then((track) => {
            if (track) {
              dispatch({
                type: 'ACTIVE_TRACK_UPDATE',
                payload: track
              })
            }
          })
      }
    })
  } catch (error) {
    console.log("something went wrong",error);
  }
}

export const destroyTrackPlayer = () => dispatch => {
  TrackPlayer.destroy();
}

export const initTrackPlayer = (queue,track) => dispatch => {
  try {
    if(_.isEmpty(track) && !_.isEmpty(queue)){
      TrackPlayer.add(queue);
    } else if (!_.isEmpty(queue) && !_.isEmpty(track)){
      TrackPlayer.add(queue).then(() => {
        TrackPlayer.skip(track.id).then(() => {
          dispatch({
            type: 'PLAY',
            payload: track
          })
        })
      })
    }
  } catch (error) {
    console.log("init error", error)
  }
}

export const addToQueue = (song) => dispatch => {
  TrackPlayer.getQueue().then((queue) => {
    if(queue){
      let update = [];
      if (_.isArray(song)) {
        update = _.differenceBy(song, queue, 'id');
      }
      else {
        update = _.differenceBy([song], queue, 'id');
      }
      if (!_.isEmpty(update)) {
        TrackPlayer.add(update);
        TrackPlayer.play();
        dispatch({
          type: 'ADD_QUEUE',
          payload: _.concat(queue, update)
        })
      } else {
        dispatch({
          type: 'NOTIFY',
          payload: 'Song is already present in the queue'
        })
      }
    }else {
      TrackPlayer.add(song);
      TrackPlayer.play();
      dispatch({
        type: 'ADD_QUEUE',
        payload: song
      })
    }

  })
    .catch((error) => {
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong'
      })
    })
}

export const getQueue = () => dispatch => {
  TrackPlayer.getQueue().then((queue) => {
    dispatch({
      type: 'ADD_QUEUE',
      payload: queue
    })
  })
}

export const removeFromQueue = (song) => dispatch => {
  TrackPlayer.remove(song.id).then(() => {
    TrackPlayer.getQueue().then((queue) => {
      dispatch({
        type: 'ADD_QUEUE',
        payload: queue
      })
    })

  })
}



export const playMedia = (item) => dispatch => {
  try {
    if (item) {
      TrackPlayer.getTrack(item.id).then((track) => {
        if (!_.isNull(track)) {
          TrackPlayer.skip(track.id).then(() => {
            TrackPlayer.play();
            dispatch({
              type: 'PLAY',
              payload: item
            })
          })
            .catch((error) => {
              console.log(error)
            })
        } else {
          if (!item.artwork || item.artwork == 'null' || _.isUndefined(item.artwork)) {
            item.artwork = require('../assets/app-icon.png')
          }
          TrackPlayer.add(item).then(() => {
            TrackPlayer.skip(item.id)
              .then(() => {
                TrackPlayer.play();
                dispatch({
                  type: 'ADD_QUEUE',
                  payload: item
                })
              })
              .catch((error) => {
                TrackPlayer.skipToNext();
                dispatch({
                  type: 'NOTIFY',
                  payload: 'Something went wrong'
                })
              })
          })
        }
      })
    }
  } catch (error) {
    console.log(error)
  }
}

export const playTrack = () => dispatch => {
  try {
    TrackPlayer.play();
  } catch (error) {
    console.log(error)
  }
}

export const pauseTrack = () => dispatch => {
  try {
    TrackPlayer.pause();
  } catch (error) {
    console.log(error)
  }
}


export const skipToNext = () => dispatch => {
  try {
    TrackPlayer.skipToNext().then(() => {
      TrackPlayer.play();
      dispatch({
        type: 'NEXT'
      })
    })
  } catch (error) {
    // console.log(error);
    TrackPlayer.stop();
  }
}
  


export const skipToPrevious = () => dispatch => {
  try {
    TrackPlayer.skipToPrevious().then(() => {
      TrackPlayer.play();
      dispatch({
        type: 'PREVIOUS'
      })
    });
  } catch (error) {
    // console.log(error);
    TrackPlayer.stop();
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


export const clearQueue = () => dispatch => {
  TrackPlayer.reset();
  dispatch({
    type: 'CLEAR_QUEUE',
    payload: []
  })  
}

  