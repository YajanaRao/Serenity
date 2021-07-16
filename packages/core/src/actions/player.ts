import sample from 'lodash/sample';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { log } from '../../../mobile/src/utils/logging';
import { TrackProps } from '../../../mobile/src/utils/types';
import { playSong } from '../features/player';



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

