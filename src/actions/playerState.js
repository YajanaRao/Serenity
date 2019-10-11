import RNAudio from 'react-native-audio';
import { DeviceEventEmitter } from 'react-native';
import Analytics from 'appcenter-analytics';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';

import { addSong, removeSong, getQueuedSongs, getPlayedSongs, clearAllSongs } from './realmAction';
/* 
 TODO:
 - Queue management in javascript
 - Player functions
  * Init Track player 
    Setup Track Player
    Add Capabilities
    Once on every mount
  * Load a track to the track player 
    On Every Track Change execute the method
    flag to play on load 
  * Play
    Track the status change of the track
    Create a notification bar
  * Pause
  * Destroy track player
    On Every Un mount

*/

var subscription = null;

const QUEUE_ID = "user-playlist--000003";
const HISTORY_ID = "user-playlist--000001";
const FAVOURITE_ID = "user-playlist--000002";

export const setUpTrackPlayer = () => dispatch => {
  try {
    subscription = DeviceEventEmitter.addListener('media', function (event) {
      // handle event
      console.log('from event listener', event);
      if (event == 'skip_to_next') {
        dispatch(skipToNext());
      } else if (event == 'skip_to_previous') {
        dispatch(skipToPrevious());
      } else if (event == 'skip_to_next') {
        dispatch(skipToNext());
      } else {
        dispatch({
          type: 'STATUS',
          status: event,
        });
      }
    });
  } catch (error) {
    console.log(error);
    Analytics.trackEvent('error', error);
  }
};

export const loadTrackPlayer = (track, playOnLoad = true) => dispatch => {
  try {
    url = track.url ? track.url : track.path;
    if (url) {
      RNAudio.load(url).then(() => {
        if (playOnLoad) {
          RNAudio.play();
        }
      });
      dispatch({
        type: 'LOAD',
        track: track,
        status: playOnLoad ? 'playing' : 'paused',
      });
    } else {
      console.log(track);
    }
  } catch (error) {
    console.log('loadTrackPlayer: ', error);
    Analytics.trackEvent('error', error);
  }
};

export const playTrack = () => dispatch => {
  try {
    console.log("play");
    RNAudio.play();
    dispatch({
      type: 'STATUS',
      status: 'playing',
    });
  } catch (error) {
    console.log('something went wrong', error);
    Analytics.trackEvent('error', error);
  }
};

export const repeatSongs = type => dispatch => {
  try {
    dispatch({
      type: 'REPEAT',
      repeat: type,
    });
  } catch (error) {
    console.log(error);
  }
};

export const shufflePlay = songs => dispatch => {
  try {
    dispatch({
      type: 'SHUFFLE_PLAY',
      songs: songs,
    });
  } catch (error) {
    console.log(error);
  }
};

export const pauseTrack = () => dispatch => {
  try {
    RNAudio.pause();
    dispatch({
      type: 'STATUS',
      status: 'paused',
    });
  } catch (error) {
    console.log(error);
    Analytics.trackEvent('error', error);
  }
};

// FIXME: implement with javascript
export const skipToNext = () => (dispatch, getState) => {
  try {
    let queue = getQueuedSongs();
    let track = null;
    if (queue.length > 1) {
      let playedTrack = head(queue);
      if (getState().config.repeat == 'repeat-one') {
        track = playedTrack;
      } else {
        addSong(HISTORY_ID, playedTrack);
        removeSong(QUEUE_ID, playedTrack);
        track = head(getQueuedSongs());
      }
      let url = track.url ? track.url : track.path;
      console.log("track url: ", url);
      RNAudio.load(url).then(() => {
        RNAudio.play();
      });
      dispatch({
        type: 'NEXT',
        track: track,
        status: 'playing',
      });
    } else {
      RNAudio.pause();
      dispatch({
        type: 'STATUS',
        status: 'paused',
      });
    }
  } catch (error) {
    console.log("skipToNext: ", error);
    Analytics.trackEvent('error', error);
  }
};

// FIXME: implement with javascript
export const skipToPrevious = () => (dispatch) => {
  try {
    let history = getPlayedSongs();
    if (history.length) {
      let track = getPlayedSongs()[0];
      addSong(QUEUE_ID, track);
      let url = track.url ? track.url : track.path;
      if (url) {
        RNAudio.load(url).then(() => {
          RNAudio.play();
        });
        dispatch({
          type: 'PREVIOUS',
          track: track,
          status: 'playing',
        });
      }
    }
    else {
      RNAudio.pause();
      dispatch({
        type: 'STATUS',
        status: 'paused',
      });
    }
  } catch (error) {
    console.log(error);
    Analytics.trackEvent('error', error);
    // TrackPlayer.stop();
  }
};

export const destroyTrackPlayer = () => dispatch => {
  // RNAudio.destroy();
  subscription.remove();
  dispatch({
    type: 'NOTIFY',
    payload: null,
  });
};

// NOTE: Queue management

export const getQueue = () => dispatch => {
  dispatch({
    type: 'QUEUE',
  });
};

export const addToQueue = song => (dispatch, getState) => {
  addSong(QUEUE_ID, song);
  if (isEmpty(getState().playerState.active)) {
    dispatch({
      type: 'LOAD',
      status: 'paused',
      track: getQueuedSongs()[0],
    });
  }
};

export const removeFromQueue = song => dispatch => {
  dispatch({
    type: 'REMOVE_QUEUE',
    payload: song,
  });
};

export const clearQueue = () => dispatch => {
  RNAudio.pause();
  clearAllSongs(QUEUE_ID);
  dispatch({
    type: 'LOAD',
    track: {},
    status: 'init'
  });
};

export const addToFavourite = song => dispatch => {
  addSong(FAVOURITE_ID, song);
  dispatch({
    type: 'NOTIFY',
    payload: 'Added song to queue'
  });
}

export const clearHistory = () => dispatch => {
  clearAllSongs(HISTORY_ID);
  dispatch({
    type: 'NOTIFY',
    payload: 'Cleared history'
  });
};
