import React from 'react';
import { Subheading } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import { ThemedIcon } from './ThemedIcon';

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  margin: 24,
};

export const EmptyPlaylist = () => {
  return (
    <View style={CONTAINER}>
      <ThemedIcon name="disc-alert" size={80} />
      <Subheading style={{ textAlign: 'center' }}>Empty playlists</Subheading>
    </View>
  );
};
