import MediaPlayer from 'react-native-media-player';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
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
import { TrackProps, AlbumProps } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

let subscription: EmitterSubscription;

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
          status: event,
          type: 'STATUS',
        });
      }
    });
    dispatch({
      status: 'paused',
      type: 'STATUS',
    });
  } catch (error) {
    log(error);
  }
};

export const loadTrack = (track: TrackProps, playOnLoad = true) => dispatch => {
  try {
    const path = track.path;
    if (path) {
      MediaPlayer.load(path).then(() => {
        if (playOnLoad) MediaPlayer.play();
      });
      dispatch({
        track,
        type: 'LOAD',
      });
    } else {
      log('unable to load track');
    }
  } catch (error) {
    log(`loadTrack: ${error}`);
  }
};

export const playNext = (track: TrackProps) => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
  getState,
) => {
  try {
    unshiftSong(QUEUE_ID, track);
    if (isEmpty(getState().playerState.active)) {
      const queue = getQueuedSongs();
      dispatch(loadTrack(head(queue)));
    }
  } catch (error) {
    log(error);
  }
};

export const repeatSongs = (type: string) => dispatch => {
  try {
    dispatch({
      repeat: type,
      type: 'REPEAT',
    });
  } catch (error) {
    log(error);
  }
};

export const shufflePlay = (songs: TrackProps[]) => dispatch => {
  try {
    dispatch({
      songs,
      type: 'SHUFFLE_PLAY',
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
        payload: true,
        type: 'RADIO_MODE',
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
        status: 'paused',
        type: 'STATUS',
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
        status: 'Playing prevoius song',
        type: 'NOTIFY',
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

export const addToQueue = (songs: TrackProps[] | TrackProps) => (
  dispatch,
  getState,
) => {
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
  } else {
    dispatch({
      type: 'NOTIFY',
      payload: `Added ${songs.length} songs to queue`,
    });
  }
};

export const removeFromQueue = (song: TrackProps) => dispatch => {
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

export const addSongToFavorite = (song: TrackProps) => dispatch => {
  addSong(FAVOURITE_ID, song, true);
  dispatch({
    type: 'NOTIFY',
    payload: `Added song ${song.title}to favorites`,
  });
};

export const addAlbumToFavorite = (album: AlbumProps) => dispatch => {
  addAlbum(album);
  dispatch({
    type: 'NOTIFY',
    payload: `Added album ${album.album} to favorite`,
  });
};

export const removeAlbumFromFavorite = (album: AlbumProps) => dispatch => {
  removeAlbum(album.id);
  dispatch({
    type: 'NOTIFY',
    payload: `Album removed from favorites`,
  });
};

export const addToPlaylist = (id: string, song: TrackProps) => dispatch => {
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
