import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';
import { Headline } from '@serenity/components';
import { Assets } from 'media';
import { TrackItem } from './TrackItem';

const OnlineSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [playlists, setPlaylists] = useState([]);

  useEffect(() => {
    const data = Assets.getPlaylists();
    setPlaylists(data);
  }, [])

  const navigateToPlaylist = (playlist: any) => {

    navigation.navigate('OnlinePlaylist', {
      playlist: playlist,
    });
  };

  if (netInfo.isConnected) {
    return (
      <View>
        <View
          style={styles.titleContainer}
        >
          <Headline>Online Songs</Headline>
        </View>
        <FlatList
          horizontal
          data={playlists}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={navigateToPlaylist} />}
        />
      </View>
    );
  }

  return null;
};

export default OnlineSongsContainer;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
