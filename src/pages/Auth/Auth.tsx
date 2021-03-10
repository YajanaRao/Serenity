import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ActivityIndicator, Button, Caption, Title } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Screen } from '../../components/Screen';
import { setUserInfo, skipLogin } from '../../actions/userState';
import { log } from '../../utils/logging';

export interface AuthScreenProps {}

// 86193367343-bp459vm9mul6frp7luvfec3hulvg9b0i.apps.googleusercontent.com
function AuthScreen({ navigation }: AuthScreenProps) {
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
      navigation.navigate('App');
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

  function skipUserLogin() {
    dispatch(skipLogin(true));
    navigation.navigate('App');
  }

  if (isLoading) {
    return (
      <Screen>
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <ActivityIndicator />
        </View>
      </Screen>
    );
  }
  return (
    <Screen>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <FastImage
          source={require('../../../assets/android-chrome-192x192.png')}
          style={{ height: 100, width: 100 }}
        />
        <Title>Serenity</Title>
        <Caption style={{ textAlign: 'center' }}>
          Login with google will give the access to youtube audios
        </Caption>
        <View
          style={{
            marginTop: 24,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <GoogleSigninButton
            style={{ width: 320, height: 48 }}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={signIn}
            disabled={isLoading}
          />
          <Caption>OR</Caption>
          <Button
            style={{ width: 320, marginTop: 12 }}
            mode="contained"
            onPress={skipUserLogin}
          >
            Continue without Login
          </Button>
        </View>
      </View>
    </Screen>
  );
}

export default AuthScreen;
