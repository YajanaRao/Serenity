import RNAudio from 'react-native-audio';
import { DeviceEventEmitter } from 'react-native';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import {
  addSong,
  removeSong,
  getQueuedSongs,
  getPlayedSongs,
  clearAllSongs,
  addAlbum,
  removeAlbum,
} from './realmAction';
import { deserializeSongs } from '../utils/database';
import log from '../utils/logging';

let subscription = null;

const QUEUE_ID = 'user-playlist--000003';
const HISTORY_ID = 'user-playlist--000001';
const FAVOURITE_ID = 'user-playlist--000002';

export const setUpTrackPlayer = () => dispatch => {
  try {
    subscription = DeviceEventEmitter.addListener('media', event => {
      // handle event
      log(`from event listener: ${event}`);
      if (event === 'skip_to_next') {
        dispatch(skipToNext());
      } else if (event === 'skip_to_previous') {
        dispatch(skipToPrevious());
      } else if (event === 'skip_to_next') {
        dispatch(skipToNext());
      } else {
        dispatch({
          type: 'STATUS',
          status: event,
        });
      }
    });
  } catch (error) {
    log(error);
  }
};

export const loadTrackPlayer = (track, playOnLoad = true) => dispatch => {
  try {
    const url = track.url ? track.url : track.path;
    if (url) {
      RNAudio.load(url, playOnLoad);
      dispatch({
        type: 'LOAD',
        track,
      });
    } else {
      log(track);
    }
  } catch (error) {
    log('loadTrackPlayer: ', error);
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
    log(`playTrack: ${error}`);
  }
};

export const repeatSongs = type => dispatch => {
  try {
    dispatch({
      type: 'REPEAT',
      repeat: type,
    });
  } catch (error) {
    log(error);
  }
};

export const shufflePlay = songs => dispatch => {
  try {
    dispatch({
      type: 'SHUFFLE_PLAY',
      songs,
    });
  } catch (error) {
    log(error);
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
    log(error);
  }
};

export const skipToNext = () => (dispatch, getState) => {
  try {
    const queue = deserializeSongs(getQueuedSongs());
    let track = null;
    const { config } = getState();
    if (config.repeat === 'repeat-one') {
      dispatch(playTrack());
    } else if (queue.length) {
      const playedTrack = getState().playerState.active;
      track = head(queue);
      addSong(HISTORY_ID, playedTrack);
      removeSong(QUEUE_ID, track);
    } else if (config.radio) {
      const playedTrack = getState().playerState.active;
      track = sample(getState().mediaStore.songs);
      addSong(HISTORY_ID, playedTrack);
      removeSong(QUEUE_ID, track);
    }

    if (track) {
      dispatch(loadTrackPlayer(track));
    } else {
      RNAudio.pause();
      dispatch({
        type: 'STATUS',
        status: 'paused',
      });
    }
  } catch (error) {
    log(`skipToNext: ${error}`);
  }
};

export const skipToPrevious = () => dispatch => {
  try {
    const history = getPlayedSongs();
    if (history.length) {
      const track = head(history);
      // addSong(QUEUE_ID, track);
      if (track) {
        dispatch(loadTrackPlayer(track));
      }
    } else {
      RNAudio.pause();
      dispatch({
        type: 'STATUS',
        status: 'paused',
      });
    }
  } catch (error) {
    log(error);
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
  const queue = getQueuedSongs();
  if (isEmpty(getState().playerState.active)) {
    dispatch({
      type: 'LOAD',
      status: 'paused',
      track: head(queue),
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
    status: 'init',
  });
};

export const addSongToFavorite = song => dispatch => {
  addSong(FAVOURITE_ID, song);
  dispatch({
    type: 'NOTIFY',
    payload: `Added song ${song.title}to favorites`,
  });
};

export const addAlbumToFavorite = album => dispatch => {
  addAlbum(album);
  dispatch({
    type: 'NOTIFY',
    payload: `Added album ${album.album} to favorite`,
  });
};

export const removeAlbumFromFavorite = album => dispatch => {
  removeAlbum(album.id);
  dispatch({
    type: 'NOTIFY',
    payload: `Album removed from favorites`,
  });
};

export const addToPlaylist = (id, song) => dispatch => {
  addSong(id, song);
  dispatch({
    type: 'NOTIFY',
    payload: 'Added to the playlist',
  });
};

export const clearHistory = () => dispatch => {
  clearAllSongs(HISTORY_ID);
  dispatch({
    type: 'NOTIFY',
    payload: 'Cleared history',
  });
};
