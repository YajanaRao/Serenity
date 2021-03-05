import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { log } from '../utils/logging';

export const setUserInfo = (user: any) => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    dispatch({
      payload: user,
      type: 'SET_USER',
    });
  } catch (error) {
    log(error);
  }
};

export const removeUserInfo = () => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    dispatch({
      type: 'REMOVE_USER',
    });
  } catch (error) {
    log(error);
  }
};

export const skipLogin = (skip: boolean) => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    dispatch({ type: 'SKIP_LOGIN', payload: skip });
  } catch (error) {
    log(error);
  }
};
