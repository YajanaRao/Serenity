import RNAudio from "react-native-audio";
import { isUndefined } from "lodash";
import { DeviceEventEmitter } from "react-native";
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
    console.log("Setup up track player")
    subscription = DeviceEventEmitter.addListener("media", function(event) {
      // handle event
      console.log(event)
      if (event == "paused") {
        dispatch({
          type: "STATUS",
          payload: "paused"
        });
      } else if (event == "playing") {
        dispatch({
          type: "STATUS",
          payload: "playing"
        });
      } else if (event == "skip_to_next") {
        dispatch({
          type: "NEXT"
        });
      } else if (event == "skip_to_previous") {
        dispatch({
          type: "PREVIOUS"
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

export const loadTrackPlayer = item => dispatch => {
  try {
    if (typeof(item) !== "undefined" && typeof(item.url) !== "undefined") {
      RNAudio.load(item.url);
      dispatch({
        type: "LOAD",
        payload: item
      });
    } else if (typeof(item) !== "undefined" && typeof(item.path) !== "undefined") {
      dispatch({
        type: "LOAD",
        payload: item
      });
    }
  } catch (error) {
    console.log("loadTrackPlayer: ", error);
  }
};

export const playTrack = () => dispatch => {
  try {
    RNAudio.play();
    dispatch({
      type: "PLAY"
    });
  } catch (error) {
    console.log("something went wrong", error);
  }
};

export const pauseTrack = () => dispatch => {
  try {
    RNAudio.pause();
    dispatch({
      type: "PAUSE"
    });
  } catch (error) {
    console.log(error);
  }
};

// FIXME: implement with javascript

export const skipToNext = () => dispatch => {
  try {
    dispatch({
      type: "NEXT"
    });
  } catch (error) {
    console.log(error);
    // TrackPlayer.stop();
  }
};

// FIXME: implement with javascript

export const skipToPrevious = () => dispatch => {
  try {
    dispatch({
      type: "PREVIOUS"
    });
  } catch (error) {
    console.log(error);
    // TrackPlayer.stop();
  }
};

export const destroyTrackPlayer = () => dispatch => {
  console.log("Remove track player");
  RNAudio.destroy();
  subscription.remove();
  dispatch({
    type: "NOTIFY",
    payload: null
  });
};

// NOTE: Queue management

export const getQueue = () => dispatch => {
  dispatch({
    type: "QUEUE"
  });
};
export const addToQueue = song => dispatch => {
  dispatch({
    type: "ADD_QUEUE",
    payload: song
  });
};

export const removeFromQueue = song => dispatch => {
  dispatch({
    type: "REMOVE_QUEUE",
    payload: song
  });
};

export const clearQueue = () => dispatch => {
  dispatch({
    type: "CLEAR_QUEUE",
    payload: []
  });
};

//  Favorite management
export const addToFavorite = item => dispatch => {
  if (!isUndefined(item)) {
    dispatch({
      type: "ADD_TO_FAVORITE",
      payload: item
    });
  }
};

export const removeFromFavorite = item => dispatch => {
  dispatch({
    type: "REMOVE_FROM_FAVORITE",
    payload: item
  });
};
