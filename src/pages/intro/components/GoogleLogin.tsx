import React, { useEffect, useState } from 'react';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from 'react-native-paper';
import { View } from 'react-native';
import { useDispatch } from 'react-redux';
import { setUserInfo, skipLogin } from '../../../actions/userState';
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

  function skip() {
    dispatch(skipLogin(true));
    next();
  }

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
    GoogleSignin.isSignedIn().then(authenticated => {
      console.log(authenticated);
      setIsAuthenticated(authenticated);
    });
  }, []);

  if (isAuthenticated) {
    return (
      <Button mode="contained" icon="done-all" color={color} onPress={next}>
        Done
      </Button>
    );
  }
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={signIn}
        disabled={isLoading}
      />
      <Button
        mode="contained"
        icon="skip-forward-outline"
        color={color}
        onPress={skip}
      >
        Skip
      </Button>
    </View>
  );
}

export default GoogleLogin;
