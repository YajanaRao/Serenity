import React from 'react';
import { FlatList } from 'react-native';

import { Screen } from '@serenity/components';
import { EntityId, selectLikedAlbums, useAppSelector } from '@serenity/core';
import { EmptyFavoriteAlbums } from './components/EmptyFavoriteAlbums';
import { Album } from './components/Album';

export const AlbumScreen = () => {

  const albums = useAppSelector(state => selectLikedAlbums(state));

  return (
    <Screen>
      {albums && albums.length ? (
        <FlatList
          data={albums}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: EntityId }) => <Album id={item} />}
        />
      ) : (
        <EmptyFavoriteAlbums />
      )}
    </Screen>
  );
};
