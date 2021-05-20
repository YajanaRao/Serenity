import { addEventListener, TrackPlayer } from 'react-track-player';
import { EmitterSubscription } from 'react-native';
import head from 'lodash/head';
import isEmpty from 'lodash/isEmpty';
import sample from 'lodash/sample';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
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
import { TrackProps, AlbumProps } from '../utils/types';
import { Youtube } from 'media';
import { FAVORITES_PLAYLIST_ID, HISTORY_PLAYLIST_ID, QUEUE_ID } from '../database/consts';

let subscription: EmitterSubscription;



export const setUpTrackPlayer =
  (track: TrackProps) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    if (track) {
      loadTrack(track);
    }
    try {
      subscription = addEventListener('media', (event: any) => {
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

export const playTrack = (track: TrackProps) =>
  async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        track,
        type: 'LOAD',
      });
      await loadTrack(track);
      addSong(HISTORY_PLAYLIST_ID, track, true);
      play();
    } catch (error) {
      log.error(`playTrack`, error);
      dispatch({
        payload: `playTrack ${track.path} of type ${track.type} failed`,
        type: 'NOTIFY',
      });
    }
  }
export const loadTrack =
  async (track: TrackProps) => {
    const { path, type } = track;
    let audioUrl = path;
    if (path) {
      if (type?.toLowerCase() === 'youtube') {
        audioUrl = await Youtube.getAudioUrl(path);
      }
      await TrackPlayer.load({
        path: audioUrl,
        title: track.title,
        artist: track.artist,
        cover: track.cover,
      })
    } else {
      log.debug(
        'loadTrack',
        `path does not exist for track track: ${track.title} `,
      );
    }
  };

export const playNext =
  (track: TrackProps) =>
    (dispatch: ThunkDispatch<undefined, undefined, AnyAction>, getState) => {
      try {
        unshiftSong(QUEUE_ID, track);
        if (isEmpty(getState().playerState.active)) {
          const queue = getQueuedSongs();
          dispatch(playTrack(head(queue)));
        }
      } catch (error) {
        log.error('playNext', error);
      }
    };

export const repeatSongs =
  (type: string) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        repeat: type,
        type: 'REPEAT',
      });
    } catch (error) {
      log.error('repeatSongs', error);
    }
  };

export const shufflePlay =
  (songs: TrackProps[]) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        songs,
        type: 'SHUFFLE_PLAY',
      });
    } catch (error) {
      log.error('shufflePlay', error);
    }
  };

export const startRadio =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState) => {
    try {
      const track = sample(getState().mediaStore.songs);
      if (track) {
        dispatch(playTrack(track));
        dispatch({
          payload: true,
          type: 'RADIO_MODE',
        });
      }
    } catch (error) {
      log.error('startRadio', error);
    }
  };

export const skipToNext =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState) => {
    try {
      const queue: TrackProps[] = deserializeSongs(getQueuedSongs());
      let track: TrackProps | null = null;
      const { config } = getState();
      if (config.repeat === 'repeat-one') {
        play();
      } else if (config.repeat === 'repeat-all' && queue.length) {
        track = head(queue);
        removeSong(QUEUE_ID, track);
      } else if (config.radio && config.repeat !== 'repeat-off') {
        track = sample(getState().mediaStore.songs);
      }

      if (track) {
        dispatch(playTrack(track));
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

export const skipToPrevious =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      const history = getPlayedSongs();
      if (history.length) {
        const track = head(history);
        if (track) {
          play();
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

export const destroyTrackPlayer =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
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

export const addToQueue =
  (songs: TrackProps[] | TrackProps) =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState) => {
      if (Array.isArray(songs)) {
        songs.forEach(song => {
          addSong(QUEUE_ID, song, true);
        });
      } else {
        addSong(QUEUE_ID, songs, true);
      }

      if (isEmpty(getState().playerState.active)) {
        const queue = getQueuedSongs();
        dispatch(playTrack(head(queue)));
      } else {
        dispatch({
          payload: `Added ${songs.length || songs.title} songs to queue`,
          type: 'NOTIFY',
        });
      }
    };

export const removeFromQueue =
  (song: TrackProps) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    removeSong(QUEUE_ID, song);
    dispatch({
      payload: song,
      type: 'REMOVE_QUEUE',
    });
  };

export const clearQueue =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    TrackPlayer.pause();
    clearAllSongs(QUEUE_ID);
    dispatch({
      status: 'init',
      track: {},
      type: 'LOAD',
    });
  };

export const addSongToFavorite =
  (song: TrackProps) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    addSong(FAVORITES_PLAYLIST_ID, song, true);
    dispatch({
      payload: `Added song ${song.title}to favorites`,
      type: 'NOTIFY',
    });
  };

export const addAlbumToFavorite =
  (album: AlbumProps) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    addAlbum(album);
    dispatch({
      payload: `Added album ${album.album} to favorite`,
      type: 'NOTIFY',
    });
  };

export const removeAlbumFromFavorite =
  (album: AlbumProps) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    removeAlbum(album.id);
    dispatch({
      payload: `Album removed from favorites`,
      type: 'NOTIFY',
    });
  };

export const addToPlaylist =
  (id: string, song: TrackProps) =>
    (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
      addSong(id, song);
      dispatch({
        payload: 'Added to the playlist',
        type: 'NOTIFY',
      });
    };

export const clearHistory =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    clearAllSongs(HISTORY_PLAYLIST_ID);
    dispatch({
      payload: 'Cleared history',
      type: 'NOTIFY',
    });
  };

export const play = () => {
  try {
    TrackPlayer.play();
  } catch (error) {
    log.error(`play`, error);
  }
};

export const pause = () => {
  try {
    TrackPlayer.pause();
  } catch (error) {
    log.error('pauseTrack', error);
  }
};
