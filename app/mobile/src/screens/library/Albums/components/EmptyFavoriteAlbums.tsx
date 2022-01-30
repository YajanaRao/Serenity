import React, { useRef } from 'react';
import { Title, Subheading } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/core';
import Animations from '../../../../assets/Animations';


export const EmptyFavoriteAlbums = () => {
  const animatedRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      animatedRef?.current?.play();

      return () => animatedRef?.current?.pause();
    }, []),
  );
  return (
    <View style={styles.container}>
      <View
        style={styles.animationContainer}
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

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  animationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 150,
    width: '100%',
  }
})