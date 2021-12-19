import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { log } from '../utils/logging';

export const setUserInfo = (user: any) => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    dispatch({
      payload: user,
      type: 'SET_USER',
    });
  } catch (error) {
    console.error('setUserInfo', error);
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
    console.error('removeUserInfo', error);
  }
};

export const googleSignIn = () => async (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    GoogleSignin.configure({
      scopes: ['https://www.googleapis.com/auth/youtube'],
    });
    await GoogleSignin.hasPlayServices();
    const userInfo = await GoogleSignin.signIn();
    dispatch({
      payload: userInfo,
      type: 'SET_USER',
    });
    const token = await GoogleSignin.getTokens();
    await AsyncStorage.setItem('@token', token.accessToken);
  } catch (error) {
    if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      // user cancelled the login flow
    } else if (error.code === statusCodes.IN_PROGRESS) {
      // operation (e.g. sign in) is in progress already
    } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
      // play services not available or outdated
    } else {
      // some other error happened
    }
    console.error('skipGoogleSignIn', error);
  }
};

export const skipGoogleLogin = (skip: boolean) => (
  dispatch: ThunkDispatch<undefined, undefined, AnyAction>,
) => {
  try {
    dispatch({ type: 'SET_GOOGLE_ACCESS', payload: skip });
  } catch (error) {
    console.error('skipGoogleLogin', error);
  }
};


