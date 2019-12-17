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
import { log } from '../utils/logging';
import { TrackProps, AlbumProps } from '../types';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

let subscription: EmitterSubscription;

const QUEUE_ID = 'user-playlist--000003';
const HISTORY_ID = 'user-playlist--000001';
const FAVOURITE_ID = 'user-playlist--000002';

export const setUpTrackPlayer = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
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

export const loadTrack = (track: TrackProps, playOnLoad = true) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    const { path } = track;
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

export const repeatSongs = (type: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    dispatch({
      repeat: type,
      type: 'REPEAT',
    });
  } catch (error) {
    log(error);
  }
};

export const shufflePlay = (songs: TrackProps[]) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    dispatch({
      songs,
      type: 'SHUFFLE_PLAY',
    });
  } catch (error) {
    log(error);
  }
};

export const startRadio = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState,
) => {
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

export const skipToNext = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState,
) => {
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

export const skipToPrevious = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
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

export const destroyTrackPlayer = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  MediaPlayer.destroy();
  subscription.remove();
  dispatch({
    payload: 'paused',
    type: 'STATUS',
  });
};

// NOTE: Queue management

export const addToQueue = (songs: TrackProps[] | TrackProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
  getState,
) => {
  if (Array.isArray(songs)) {
    songs.forEach(song => {
      addSong(QUEUE_ID, song, true);
    });
  } else {
    addSong(QUEUE_ID, songs, true);
  }

  if (isEmpty(getState().playerState.active)) {
    const queue = getQueuedSongs();
    dispatch(loadTrack(head(queue)));
  } else {
    dispatch({
      payload: `Added ${songs.length} songs to queue`,
      type: 'NOTIFY',
    });
  }
};

export const removeFromQueue = (song: TrackProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  removeSong(QUEUE_ID, song);
  dispatch({
    payload: song,
    type: 'REMOVE_QUEUE',
  });
};

export const clearQueue = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  MediaPlayer.pause();
  clearAllSongs(QUEUE_ID);
  dispatch({
    status: 'init',
    track: {},
    type: 'LOAD',
  });
};

export const addSongToFavorite = (song: TrackProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  addSong(FAVOURITE_ID, song, true);
  dispatch({
    payload: `Added song ${song.title}to favorites`,
    type: 'NOTIFY',
  });
};

export const addAlbumToFavorite = (album: AlbumProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  addAlbum(album);
  dispatch({
    payload: `Added album ${album.album} to favorite`,
    type: 'NOTIFY',
  });
};

export const removeAlbumFromFavorite = (album: AlbumProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  removeAlbum(album.id);
  dispatch({
    payload: `Album removed from favorites`,
    type: 'NOTIFY',
  });
};

export const addToPlaylist = (id: string, song: TrackProps) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  addSong(id, song);
  dispatch({
    payload: 'Added to the playlist',
    type: 'NOTIFY',
  });
};

export const clearHistory = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  clearAllSongs(HISTORY_ID);
  dispatch({
    payload: 'Cleared history',
    type: 'NOTIFY',
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
