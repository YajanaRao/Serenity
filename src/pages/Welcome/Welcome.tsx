import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useTheme } from 'react-native-paper';

export interface WelcomeScreenProps extends StackScreenProps {}

export function WelcomeScreen({ navigation }: WelcomeScreenProps) {
  const { colors } = useTheme();
  const { skipLoginState } = useSelector(state => state.user);

  useEffect(() => {
    isSignedIn();
  }, []);

  const isSignedIn = async () => {
    const authenticated = await GoogleSignin.isSignedIn();
    if (authenticated || skipLoginState) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Intro');
    }
  };

  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}
