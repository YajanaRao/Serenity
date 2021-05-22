import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import { Screen } from 'components';
import { EmptyFavoriteAlbums } from '../../components/EmptyFavoriteAlbums';
import { getAlbums } from '../../actions/realmAction';
import { deserializeAlbums } from '../../utils/database';
import { AlbumProps } from '../../utils/types';

export const AlbumScreen = ({ navigation }) => {
  const realmAlbums = getAlbums();

  const [albums, setAlbums] = useState(() => {
    return deserializeAlbums(realmAlbums);
  });

  useEffect(() => {
    const listener = (albums: AlbumProps, changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const album = deserializeAlbums(albums);
        setAlbums(album);
      }
    };
    if (realmAlbums !== undefined) {
      realmAlbums.addListener(listener);
    }
    return () => {
      realmAlbums.removeListener(listener);
    };
  }, [realmAlbums]);

  return (
    <Screen>
      {albums.length ? (
        <FlatList
          data={albums}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: AlbumProps }) => (
            <List.Item
              title={item.name}
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
