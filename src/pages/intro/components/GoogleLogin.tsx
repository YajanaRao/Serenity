import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../../actions/userState';
import { log } from '../../../utils/logging';

export interface GoogleLoginProps {
  color: string;
  next: () => void;
}

// 86193367343-bp459vm9mul6frp7luvfec3hulvg9b0i.apps.googleusercontent.com
function GoogleLogin({ color, next }: GoogleLoginProps) {
  const [isLoading, setisLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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
      setIsAuthenticated(true);
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

  useEffect(() => {
    GoogleSignin.isSignedIn().then(authenticated =>
      setIsAuthenticated(authenticated),
    );
  }, []);

  // function skipUserLogin() {
  //   dispatch(skipLogin(true));
  //   navigation.navigate('App');
  // }

  if (isAuthenticated) {
    return (
      <Button
        mode="contained"
        icon="checkmark-done-outline"
        color={color}
        onPress={next}
      >
        Done
      </Button>
    );
  }
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
