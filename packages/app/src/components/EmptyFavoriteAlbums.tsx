import React, { useRef } from 'react';
import { Title, Subheading } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/core';
import Animations from '../assets/Animations';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  margin: 24,
};

export const EmptyFavoriteAlbums = () => {
  const animatedRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      animatedRef.current.play();

      return () => animatedRef.current.pause();
    }, []),
  );
  return (
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
          ref={animatedRef}
          source={Animations.favoriteAnimation}
          loop
        />
      </View>
      <Title>No favorites yet.</Title>
      <Subheading style={{ textAlign: 'center' }}>
        Songs, albums, artists and playlists you&apos;ve liked will live here
      </Subheading>
    </View>
  );
};
