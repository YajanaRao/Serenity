import React from 'react';
import { List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import { useNavigation } from '@react-navigation/core';
import { albumsSelectors, useAppSelector } from '../../../../../../core/src';

export interface AlbumProps {
    id: number;
}

export function Album({ id }: AlbumProps) {
    const navigation = useNavigation();
    const album = useAppSelector(state => albumsSelectors.selectById(state, id));

    return (
        <List.Item
            title={album.album}
            description={album.artist}
            left={() => (
                <FastImage
                    // {...props}
                    source={{ uri: album.cover }}
                    style={{ width: 50, height: 50, borderRadius: 4 }}
                />
            )}
            onPress={() => {
                navigation.navigate('AlbumSongs', {
                    album,
                });
            }}
        />
    );
}
