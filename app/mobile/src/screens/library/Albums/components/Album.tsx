import React from 'react';
import { List } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { albumsSelectors, EntityId, useAppSelector } from '@serenity/core';
import { ArtCover } from 'components/ArtCover/ArtCover';

export interface AlbumProps {
    id: EntityId;
}

export function Album({ id }: AlbumProps) {
    const navigation = useNavigation();
    const album = useAppSelector(state => albumsSelectors.selectById(state, id));

    if (!album) return null;
    return (
        <List.Item
            title={album.album}
            description={album.artist}
            left={() => (
                <ArtCover cover={album.cover} />
            )}
            onPress={() => {
                navigation.navigate('AlbumSongs', {
                    album,
                });
            }}
        />
    );
}
