import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { selectPlaylistById } from '@serenity/core';
import FastImage from 'react-native-fast-image';
import { StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/core';

export interface PlaylistProps {
    id: string;
}

export function Playlist({ id }: PlaylistProps) {
    const playlist = useSelector(state => selectPlaylistById(state, id));
    const navigation = useNavigation();
    const { colors } = useTheme();
    const navigateToCollection = (playlist: PlaylistProps) => {
        navigation.navigate('PlaylistSongs', {
            playlist,
        });
    };
    return (
        <List.Item
            title={playlist.name}
            description={`by ${playlist.owner}`}
            left={props =>
                playlist.cover ? (
                    <FastImage
                        source={{ uri: playlist.cover }}
                        style={[styles.artwork, { backgroundColor: colors.surface }]}
                        resizeMode="cover"
                    />
                ) : (
                    <List.Icon {...props} icon="folder" />
                )
            }
            onPress={() => navigateToCollection(playlist)}
        />
    );
}

const styles = StyleSheet.create({
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        margin: 8,
    },
    artwork: {
        backgroundColor: '#d7d1c9',
        borderRadius: 4,
        height: 50,
        width: 50,
    },
});
