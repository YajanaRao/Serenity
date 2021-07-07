import React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import { Screen } from '@serenity/components';
import { useSelector } from 'react-redux';
import { selectLikedAlbums } from '@serenity/core';
import { EmptyFavoriteAlbums } from '../../../components/EmptyFavoriteAlbums';
import { AlbumProps } from '../../../utils/types';

export const AlbumScreen = ({ navigation }) => {

  const albums = useSelector(state => selectLikedAlbums(state));

  return (
    <Screen>
      {albums.length ? (
        <FlatList
          data={albums}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: AlbumProps }) => (
            <List.Item
              title={item.album}
              description={item.artist}
              left={() => (
                <FastImage
                  // {...props}
                  source={{ uri: item.cover }}
                  style={{ width: 50, height: 50, borderRadius: 4 }}
                />
              )}
              onPress={() => {
                navigation.navigate('AlbumSongs', {
                  album: item,
                });
              }}
            />
          )}
        />
      ) : (
        <EmptyFavoriteAlbums />
      )}
    </Screen>
  );
};
