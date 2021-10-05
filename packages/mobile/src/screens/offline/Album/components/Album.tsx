import React from 'react';
import { List } from 'react-native-paper';
import { albumsSelectors, EntityId, useAppSelector } from '@serenity/core';
import { useNavigation } from '@react-navigation/core';
import { AlbumCover } from './AlbumCover';

export interface AlbumProps {
    id: EntityId;
}

export function Album({ id }: AlbumProps) {
    const album = useAppSelector(state => albumsSelectors.selectById(state, id));
    const navigation = useNavigation();

    if (!album) return null;
    return (
        <List.Item
            title={album.album}
            left={props => <AlbumCover uri={album.cover} />}
            description={`${album.numberOfSongs} songs`}
            onPress={() => {
                navigation.navigate('AlbumSongs', {
                    album,
                });
            }}
        />
    );
}


