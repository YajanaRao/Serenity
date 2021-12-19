import React from 'react';
import { View, StyleSheet } from 'react-native';
import { EntityId, historySelectors, Player, useAppDispatch, useAppSelector } from '@serenity/core';
import { useTheme, List } from 'react-native-paper';
import { ArtCover } from '../ArtCover/ArtCover';

interface Props {
    id: EntityId;
}

export const HistoryItem = React.memo(({ id }: Props) => {
    const { colors } = useTheme();
    const song = useAppSelector(state => historySelectors.selectById(state, id));
    const dispatch = useAppDispatch();


    const play = () => {
        if (song) dispatch(Player.playSong(song));
    };

    if (!song) return null;
    return (
        <View style={[styles.surface, { backgroundColor: colors.background }]}>
            <List.Item
                title={song?.title}
                description={song?.artist || song?.album}
                left={(props) => <ArtCover cover={song?.cover} {...props} />}
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