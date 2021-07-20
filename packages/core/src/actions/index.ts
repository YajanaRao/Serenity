import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
// import { defaultDBSetup } from '../actions/realmAction';

export const updateTheme = (theme: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  if (theme === 'dark') {
    dispatch({
      payload: 'default',
      type: 'UPDATE_THEME',
    });
  } else {
    dispatch({
      payload: 'dark',
      type: 'UPDATE_THEME',
    });
  }
};

export const changeRadioMode = (radio: boolean) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({
    payload: radio,
    type: 'RADIO_MODE',
  });
};

export const notify = (message: string) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  dispatch({
    type: 'NOTIFY',
    payload: message,
  });
};