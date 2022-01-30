import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
// import { Track } from '../../components/Track';
import { SongProps } from '@serenity/core';
import { Songs } from '@serenity/extensions';
import { useQuery } from 'react-query';
import { Song } from './Song';

const PlaylistList = () => {
  const netInfo = useNetInfo();

  const { data, isLoading } = useQuery('playlists', () => Songs.getPlaylists())


  if (netInfo.isConnected && !isLoading) {
    return (
      <div className='container'>
        <View
          style={styles.titleContainer}
        >
          <Headline>Songs</Headline>
        </View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          // @ts-ignore
          renderItem={({ item }: { item: SongProps }) => <Song song={item} />}
        />
      </div>
    );
  }

  return null;
};

export default PlaylistList;

const styles = StyleSheet.create({
  container: { overflow: 'hidden' },
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
