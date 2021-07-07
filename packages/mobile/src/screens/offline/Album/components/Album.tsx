import React from 'react';
import { List } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectAlbumById } from '@serenity/core';
import FastImage from 'react-native-fast-image';
import { DefaultImage } from '../../../../components/DefaultImage';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export interface AlbumProps {
    id: string;
}

export function Album({ id }: AlbumProps) {
    const album = useSelector(state => selectAlbumById(state, id));
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
                    album: album,
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

