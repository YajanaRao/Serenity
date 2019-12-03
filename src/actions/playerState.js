import MediaPlayer from 'react-native-media-player';
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
  unshiftSong,
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
    dispatch({
      type: 'STATUS',
      status: 'paused',
    });
  } catch (error) {
    log(error);
  }
};

export const loadTrack = (track, playOnLoad = true) => dispatch => {
  try {
    const url = track.url ? track.url : track.path;
    if (url) {
      MediaPlayer.load(url).then(() => {
        if (playOnLoad) MediaPlayer.play();
      });
      dispatch({
        type: 'LOAD',
        track,
      });
    } else {
      log(track);
    }
  } catch (error) {
    log('loadTrack: ', error);
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

export const startRadio = () => (dispatch, getState) => {
  try {
    const track = sample(getState().mediaStore.songs);
    if (track) {
      dispatch(loadTrack(track));
      dispatch({
        type: 'RADIO_MODE',
        payload: true,
      });
    }
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
      const playedTrack = getState().playerState.active;
      addSong(HISTORY_ID, playedTrack);
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
    }

    if (track) {
      dispatch(loadTrack(track));
    } else {
      MediaPlayer.pause();
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
        dispatch(loadTrack(track));
      }
    } else {
      MediaPlayer.pause();
      dispatch({
        type: 'NOTIFY',
        status: 'Playing prevoius song',
      });
    }
  } catch (error) {
    log(error);
  }
};

export const destroyTrackPlayer = () => dispatch => {
  MediaPlayer.destroy();
  subscription.remove();
  dispatch({
    type: 'STATUS',
    payload: 'paused',
  });
};

// NOTE: Queue management

export const addToQueue = songs => (dispatch, getState) => {
  if (Array.isArray(songs)) {
    songs.forEach(song => {
      addSong(QUEUE_ID, song);
    });
  } else {
    addSong(QUEUE_ID, songs);
  }

  if (isEmpty(getState().playerState.active)) {
    const queue = getQueuedSongs();
    dispatch(loadTrack(head(queue)));
  }
};

export const removeFromQueue = song => dispatch => {
  dispatch({
    type: 'REMOVE_QUEUE',
    payload: song,
  });
};

export const clearQueue = () => dispatch => {
  MediaPlayer.pause();
  clearAllSongs(QUEUE_ID);
  dispatch({
    type: 'LOAD',
    track: {},
    status: 'init',
  });
};

export const addSongToFavorite = song => dispatch => {
  addSong(FAVOURITE_ID, song, true);
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

export const playTrack = () => {
  try {
    MediaPlayer.play();
  } catch (error) {
    log(`playTrack: ${error}`);
  }
};

export const pauseTrack = () => {
  try {
    MediaPlayer.pause();
  } catch (error) {
    log(error);
  }
};
