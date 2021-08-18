import { addEventListener, TrackPlayer } from 'react-track-player';
import { EmitterSubscription } from 'react-native';
import sample from 'lodash/sample';
import isEmpty from 'lodash/isEmpty';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { addSongToHistory } from "./historySlice";
import { play, updateRadioMode, updateRepeatType, updateStatus } from "./playerSlice";
import { addSongToQueue, addSongsToQueue, removeSongFromQueue } from './queueSlice';
import { updateNotification } from '../ui/uiSlice';
import { SongProps } from './types';

let subscription: EmitterSubscription;

function loadTrack(track: SongProps) {
  return TrackPlayer.load({
    path: track.path,
    title: track.title,
    artist: track.artist,
    cover: track.cover,
  });
}

export function setUpTrackPlayer() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    try {
      // @ts-ignore
      dispatch(updateStatus("init"));
      subscription = addEventListener('media', (event: any) => {
        dispatch(updateStatus(event));
      });
      const { track } = getState().player;
      if (!isEmpty(track)) {
        loadTrack(track);
      }
    } catch (error) {
      console.log('setUpTrackPlayer', error);
    }
  };
}

export function repeatSongs(repeatType: string) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch(updateRepeatType(repeatType));
    } catch (error) {
      console.log('shufflePlay', error);
    }
  };
}

export function destroyTrackPlayer() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    TrackPlayer.destroy();
    if (subscription !== undefined) {
      subscription.remove();
    }
    dispatch(updateStatus("init"));
  };
}

export function playSong(song: SongProps) {
  return (dispatch: any, getState: any) => {
    if (!song.path && !song.url) {
      throw new Error("path or url of the song is missing");
    }

    const { track } = getState().player;
    if (!isEmpty(track)) {
      dispatch(addSongToHistory({
        ...track,
        date: new Date().toUTCString(),
      }))
    }
    loadTrack(song).then(() => {
      TrackPlayer.play();
    });
    dispatch(play(song));
  }
}

export function playNext() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { queue } = getState();
    if (!queue.length) {
      dispatch(updateNotification("No songs in the queue"));
    }
    const { entities, ids } = queue;
    const song = entities[ids[0]];
    dispatch(playSong(song));
    dispatch(removeSongFromQueue(song.id));
    loadTrack(song);
  }
}

export function playPrevious() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { history } = getState();
    if (!history.length) {
      dispatch(updateNotification("No songs in the history"));
    }
    const { entities, ids } = history;
    const song = entities[ids[0]];
    dispatch(playSong(song));
    loadTrack(song);
  }
}


export function toggle() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { status } = getState().player;
    if (status === "playing") {
      TrackPlayer.pause();
    } else if (status === "paused") {
      TrackPlayer.play();
    } else if (status === "init") {
      const { track } = getState().player;
      loadTrack(track).then(() => {
        TrackPlayer.play()
      });
    } else {
      console.log("another status: ", status);
      const { track } = getState().player;
      loadTrack(track).then(() => {
        TrackPlayer.play()
      });
    }
    dispatch(updateStatus(status))
  }
}

export function add(songs: Array<SongProps> | SongProps) {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { track } = getState().player;
    if (Array.isArray(songs)) {
      dispatch(addSongsToQueue(songs));
      dispatch(updateNotification(`${songs.length} songs added to queue`));
    } else {
      dispatch(addSongToQueue(songs));
      dispatch(updateNotification(`${songs.title} added to queue`));
    }
    if (isEmpty(track)) {
      dispatch(playSong(track));
    }
  }
}

export function startRadio() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    try {
      dispatch(updateNotification("Starting radio"));
      const { track } = getState().player;
      if (isEmpty(track)) {
        const song = sample(getState().songs.entities);
        dispatch(playSong(song));
        dispatch(updateRadioMode(true));
      } else {
        TrackPlayer.play();
      }
    } catch (error) {
      console.log('startRadio', error);
    }
  }
}