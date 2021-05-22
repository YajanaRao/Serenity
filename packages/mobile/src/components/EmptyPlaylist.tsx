import React from 'react';
import { Headline } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { Screen } from 'components';
import Animations from '../assets/Animations';

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 24,
};

export const EmptyPlaylist = () => {
  return (
    <Screen>
      <View style={CONTAINER}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 150,
            width: '100%',
          }}
        >
          <LottieView
            source={Animations.emptyPlaylistAnimation}
            autoPlay
            loop
          />
        </View>
        <Headline style={{ textAlign: 'center' }}>Empty playlists</Headline>
      </View>
    </Screen>
  );
};
