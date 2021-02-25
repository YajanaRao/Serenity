import React from 'react';
import { Subheading } from 'react-native-paper';
import { View, ViewStyle } from 'react-native';
import { ThemedIcon } from './ThemedIcon';
import { Screen } from './Screen';

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
        <ThemedIcon name="alert" size={80} />
        <Subheading style={{ textAlign: 'center' }}>Empty playlists</Subheading>
      </View>
    </Screen>
  );
};
