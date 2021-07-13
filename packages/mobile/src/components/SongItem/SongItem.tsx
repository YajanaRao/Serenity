import React from 'react';

// import { playTrack } from '../actions/player';
import { playSong, songsSelectors, useAppDispatch, useAppSelector } from '@serenity/core';
import { View, StyleSheet } from 'react-native';
import { useTheme, List } from 'react-native-paper';
import { ArtCover } from '../ArtCover/ArtCover';

interface Props {
    id: number;
}

export const SongItem = React.memo(({ id }: Props) => {
    const { colors } = useTheme();
    const song = useAppSelector(state => songsSelectors.selectById(state, id));
    const dispatch = useAppDispatch();


    const play = () => {
        if (song) dispatch(playSong(song));
    };

    if (!song) return null;
    return (
        <View style={[styles.surface, { backgroundColor: colors.background }]}>
            <List.Item
                title={song?.title}
                description={song?.artist || song?.album}
                left={() => <ArtCover cover={song?.cover} />}
                onPress={() => play()}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    surface: {
        padding: 0,
        margin: 0,
        borderRadius: 4,
    },
});