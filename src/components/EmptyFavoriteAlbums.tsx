import React from 'react';
import { Title, Subheading } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import LottieView from 'lottie-react-native';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flex: 1,
  justifyContent: 'center',
  margin: 24,
};

export const EmptyFavoriteAlbums = () => {
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
        <LottieView source={require('../assets/Favorite.json')} autoPlay loop />
      </View>
      <Title>No favorites yet.</Title>
      <Subheading style={{ textAlign: 'center' }}>
        Songs, albums, artists and playlists you&apos;ve liked will live here
      </Subheading>
    </View>
  );
};
