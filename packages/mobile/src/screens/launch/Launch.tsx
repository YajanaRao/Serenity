import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { StackNavigationProp } from '@react-navigation/stack';
import { selectIntroSlides, useAppSelector } from '@serenity/core';
import { AppStackParamList } from '../RootNavigator';

type LaunchScreenNavigationProp = StackNavigationProp<
  AppStackParamList,
  'Launch'
>;

type Props = {
  navigation: LaunchScreenNavigationProp;
};
function LaunchScreen({ navigation }: Props) {
  const { colors } = useTheme();
  const introSlidesShown = useAppSelector(selectIntroSlides);

  useEffect(() => {
    isSignedIn();
  }, []);

  const isSignedIn = () => {
    if (introSlidesShown) {
      navigation.navigate('App');
    } else {
      navigation.navigate('Intro');
    }
  };

  return <View style={{ flex: 1, backgroundColor: colors.background }} />;
}

export default LaunchScreen;
