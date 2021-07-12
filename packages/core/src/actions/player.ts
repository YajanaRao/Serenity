import { addEventListener, TrackPlayer } from 'react-track-player';
import { EmitterSubscription } from 'react-native';
import sample from 'lodash/sample';

import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { log } from '../../../mobile/src/utils/logging';
import { TrackProps } from '../../../mobile/src/utils/types';
import { updateStatus } from '../features/player/playerSlice';
import { playSong } from '../features/player';

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
        //   dispatch(updateStatus(event));
        // }
      });
    } catch (error) {
      log.error('setUpTrackPlayer', error);
    }
  };
}



export const loadTrack =
  async (track: TrackProps) => {
    const { path, type } = track;
    const audioUrl = path;
    if (path) {
      // if (type?.toLowerCase() === 'youtube') {
      //   audioUrl = await Youtube.getAudioUrl(path);
      // }
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
      log.error('startRadio', error);
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

