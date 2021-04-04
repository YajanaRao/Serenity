import { TrackPlayer } from 'react-track-player';
import { DeviceEventEmitter, EmitterSubscription } from 'react-native';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import ytdl from 'react-native-ytdl';
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
      console.log('from event listener', event);
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
    log.error('setUpTrackPlayer', error);
  }
};

export const loadTrack = (track: TrackProps, playOnLoad = true) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  try {
    const { path, type } = track;
    log.debug('loadTrack', `load track: ${track.path}`);
    if (path) {
      if (type?.toLowerCase() === 'youtube') {
        ytdl(path, { filter: format => format.container === 'mp4' })
          .then(urls => {
            const { url } = urls[0];
            TrackPlayer.load({
              path: url,
              title: track.title,
              artist: track.artist,
              cover: track.cover,
            })
              .then(() => {
                if (playOnLoad) TrackPlayer.play();
              })
              .catch(error => console.log('error', error));
          })
          .catch(error => {
            log.error(`loadTrack ${path} from youtube`, error);
            dispatch({
              payload: `loadTrack ${path} from youtube failed`,
              type: 'NOTIFY',
            });
          });
      } else {
        TrackPlayer.load({
          path,
          title: track.title,
          artist: track.artist,
        }).then(() => {
          if (playOnLoad) TrackPlayer.play();
        });
      }
      dispatch({
        track,
        type: 'LOAD',
      });
    } else {
      log.debug(
        'loadTrack',
        `path does not exist for track track: ${track.title} `,
      );
    }
  } catch (error) {
    log.debug(`loadTrack`, error);
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
    log.error('playNext', error);
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
    log.error('repeatSongs', error);
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
    log.error('shufflePlay', error);
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
    log.error('startRadio', error);
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
    } else if (config.repeat === 'repeat-all' && queue.length) {
      const playedTrack = getState().playerState.active;
      track = head(queue);
      addSong(HISTORY_ID, playedTrack);
      removeSong(QUEUE_ID, track);
    } else if (config.radio && config.repeat !== 'repeat-off') {
      const playedTrack = getState().playerState.active;
      track = sample(getState().mediaStore.songs);
      addSong(HISTORY_ID, playedTrack);
    }

    if (track) {
      dispatch(loadTrack(track));
    } else {
      TrackPlayer.pause();
      dispatch({
        status: 'paused',
        type: 'STATUS',
      });
    }
  } catch (error) {
    log.error(`skipToNext`, error);
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
      TrackPlayer.pause();
      dispatch({
        payload: 'Playing prevoius song',
        type: 'NOTIFY',
      });
    }
  } catch (error) {
    log.error('skipToPrevious', error);
  }
};

export const destroyTrackPlayer = () => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  TrackPlayer.destroy();
  if (subscription !== undefined) {
    subscription.remove();
  }
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
      payload: `Added ${songs.length || songs.title} songs to queue`,
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
  TrackPlayer.pause();
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
    TrackPlayer.play();
  } catch (error) {
    log.error(`playTrack`, error);
  }
};

export const pauseTrack = () => {
  try {
    TrackPlayer.pause();
  } catch (error) {
    log.error('pauseTrack', error);
  }
};
