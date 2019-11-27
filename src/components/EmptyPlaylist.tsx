import React from 'react';
import { Subheading } from 'react-native-paper';
import { View } from 'react-native';
import ThemedIcon from './ThemedIcon';

const EmptyPlaylist = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 24,
      }}
    >
      <ThemedIcon name="disc-alert" size={80} />
      <Subheading style={{ textAlign: 'center' }}>Empty playlists</Subheading>
    </View>
  );
};

export default EmptyPlaylist;
