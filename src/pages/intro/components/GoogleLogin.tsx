import React, { useState } from 'react';
import { View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../actions/userState';
import { log } from '../../../utils/logging';

export interface GoogleLoginProps {
  next: () => void;
}

// 86193367343-bp459vm9mul6frp7luvfec3hulvg9b0i.apps.googleusercontent.com
function GoogleLogin({ next }: GoogleLoginProps) {
  const [isLoading, setisLoading] = useState(false);
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      setisLoading(true);
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/youtube'],
      });
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      dispatch(setUserInfo(userInfo));

      const token = await GoogleSignin.getTokens();
      await AsyncStorage.setItem('@token', token.accessToken);
      setisLoading(false);
      next();
    } catch (error) {
      log.error('error: ', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  // function skipUserLogin() {
  //   dispatch(skipLogin(true));
  //   navigation.navigate('App');
  // }

  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={isLoading}
    />
  );
}

export default GoogleLogin;
