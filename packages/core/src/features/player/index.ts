import { addEventListener, TrackPlayer } from 'react-track-player';
import { EmitterSubscription } from 'react-native';
import sample from 'lodash/sample';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import { addSongToHistory } from "./historySlice";
import { play, removeSongFromQueue, updateStatus } from "./playerSlice";

let subscription: EmitterSubscription;



export function setUpTrackPlayer() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      subscription = addEventListener('media', (event: any) => {
        // handle event
        console.log('from event listener', event);
        // if (event === 'skip_to_next') {
        //   dispatch(playNext());
        // } else if (event === 'skip_to_previous') {
        //   dispatch(playPrevious());
        // } else {
        dispatch(updateStatus(event));
        // }
      });
    } catch (error) {
      console.log('setUpTrackPlayer', error);
    }
  };
}




export const shufflePlay =
  (songs: Song[]) => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    try {
      dispatch({
        songs,
        type: 'SHUFFLE_PLAY',
      });
    } catch (error) {
      console.log('shufflePlay', error);
    }
  };

export const startRadio =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    try {
      const track = sample(getState().queue);
      if (track) {
        dispatch(playSong(track));
        dispatch({
          payload: true,
          type: 'RADIO_MODE',
        });
      }
    } catch (error) {
      console.log('startRadio', error);
    }
  };



export const destroyTrackPlayer =
  () => (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    TrackPlayer.destroy();
    if (subscription !== undefined) {
      subscription.remove();
    }
    dispatch(updateStatus("init"));
  };

interface Song {
  title: string;
  artist?: string;
  album?: string;
  cover?: string;
  path?: string;
  url?: string;
}

function loadTrack(track: Song) {
  return TrackPlayer.load({
    path: track.path,
    title: track.title,
    artist: track.artist,
    cover: track.cover,
  });
}



export function playSong(song: Song) {
  return (dispatch: any, getState: any) => {
    console.log("playing", song);

    if (!song.path && !song.url) {
      throw new Error("path or url of the song is missing");
    }

    const playedSong = getState().player.track;
    dispatch(addSongToHistory({
      ...playedSong,
      date: new Date().toUTCString(),
    }))
    loadTrack(song);
    dispatch(play(song));
  }
}
export function playNext() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { queue } = getState();
    if (!queue.length) {
      // no songs in the queue
      // TODO:
      // display notification saying the same only once  
    }
    const song = queue[0];
    dispatch(playSong(song));
    dispatch(removeSongFromQueue(song));
    loadTrack(song);
  }
}

export function playPrevious() {
  return (dispatch: ThunkDispatch<{}, {}, AnyAction>, getState: any) => {
    const { history } = getState();
    if (!history.length) {
      // no songs in the queue
      // TODO:
      // display notification saying the same only once  
    }
    const song = history[0];
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
      console.log('init');
      const { track } = getState().player;
      loadTrack(track).then(() => {
        TrackPlayer.play()
      });
    } else {
      console.log("another status: ", status)
    }
    dispatch(updateStatus(status))
  }

}