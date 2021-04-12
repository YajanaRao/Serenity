import React, { useEffect } from 'react';
import { StackScreenProps } from '@react-navigation/stack';
import { View } from 'react-native';
import { useSelector } from 'react-redux';
import { useTheme } from 'react-native-paper';

export interface LaunchScreenProps extends StackScreenProps {}

function LaunchScreen({ navigation }: LaunchScreenProps) {
  const { colors } = useTheme();
  const { introSlidesShown } = useSelector(state => state.user);

  useEffect(() => {
    isSignedIn();
  }, []);

  const isSignedIn = async () => {
    if (introSlidesShown) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Intro');
    }
  };

  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}

export default LaunchScreen;
