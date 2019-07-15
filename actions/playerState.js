import TrackPlayer from 'react-native-track-player';
import _ from 'lodash';

export const playMedia = (item) => dispatch => {
    if(item){
      TrackPlayer.getCurrentTrack().then((trackId) => {
        if (!_.isNull(trackId) && trackId != item.id) {
          TrackPlayer.skip(item.id).then(() => {
            TrackPlayer.play();
            dispatch({
              type: 'PLAY',
              payload: item
            })
          })
          .catch((error) => { 
            if(!item.artwork || item.artwork == 'null' || _.isUndefined(item.artwork)){
              item.artwork = require('../assets/app-icon.png')
            }
            console.log(item.artwork)
            TrackPlayer.add(item,trackId).then(() => {
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
        }else {
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
                TrackPlayer.skipToNext();
                dispatch({
                  type: 'NOTIFY',
                  payload: 'Something went wrong'
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
      }else {
        dispatch({
          type: 'NOTIFY',
          payload: 'Song is already present in the queue'
        })
      }
    })
    .catch((error) => {
      TrackPlayer.add(song);
      TrackPlayer.play();
      dispatch({
        type: 'NOTIFY',
        payload: 'Something went wrong'
      })
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