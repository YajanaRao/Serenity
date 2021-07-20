import React from 'react';
import { List } from 'react-native-paper';
import { albumsSelectors, useAppSelector } from '@serenity/core';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { DefaultImage } from '../../../../components/DefaultImage';

export interface AlbumProps {
    id: string;
}

export function Album({ id }: AlbumProps) {
    const album = useAppSelector(state => albumsSelectors.selectById(state, id));
    const navigation = useNavigation();
    return (
        <List.Item
            title={album.album}
            left={props =>
                album.cover === null ? (
                    <DefaultImage style={styles.icons} />
                ) : (
                    <FastImage
                        {...props}
                        source={{ uri: album.cover }}
                        style={styles.icons}
                    />
                )
            }
            description={`${album.numberOfSongs} songs`}
            onPress={() => {
                navigation.navigate('AlbumSongs', {
                    album,
                });
            }}
        />
    );
}

const styles = StyleSheet.create({
    icons: {
        width: 50,
        borderRadius: 4,
        backgroundColor: '#d7d1c9',
    },
});

