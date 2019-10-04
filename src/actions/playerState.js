import RNAudio from 'react-native-audio';
import isUndefined from 'lodash/isUndefined';
import {DeviceEventEmitter} from 'react-native';
import Analytics from 'appcenter-analytics';
import isEmpty from 'lodash/isEmpty';
import head from 'lodash/head';
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

export const setUpTrackPlayer = () => dispatch => {
  try {
    subscription = DeviceEventEmitter.addListener('media', function(event) {
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
    queue = getState().playerState.queue;
    if (getState().config.repeat == 'repeat-one') {
      track = getState().playerState.active;
    } else {
      track = isEmpty(queue) ? null : head(queue);
    }

    if (track) {
      url = track.url ? track.url : track.path;
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
    console.log(error);
    Analytics.trackEvent('error', error);
    // TrackPlayer.stop();
  }
};

// FIXME: implement with javascript

export const skipToPrevious = () => (dispatch, getState) => {
  try {
    history = getState().playerState.history;
    track = isEmpty(history) ? null : head(history);
    url = track.url ? track.url : track.path;
    if (url) {
      RNAudio.load(url).then(() => {
        RNAudio.play();
      });
      dispatch({
        type: 'PREVIOUS',
        track: track,
        status: 'playing',
      });
    } else {
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

export const addToQueue = song => dispatch => {
  dispatch({
    type: 'ADD_QUEUE',
    payload: song,
  });
};

export const removeFromQueue = song => dispatch => {
  dispatch({
    type: 'REMOVE_QUEUE',
    payload: song,
  });
};

export const clearQueue = () => dispatch => {
  dispatch({
    type: 'CLEAR_QUEUE',
    payload: [],
  });
};

//  Favorite management
export const addToFavorite = item => dispatch => {
  if (!isUndefined(item)) {
    dispatch({
      type: 'ADD_TO_FAVORITE',
      payload: item,
    });
  }
};

export const removeFromFavorite = item => dispatch => {
  dispatch({
    type: 'REMOVE_FROM_FAVORITE',
    payload: item,
  });
};

export const clearHistory = () => dispatch => {
  dispatch({
    type: 'CLEAR_HISTORY',
  });
};
