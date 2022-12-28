import React from 'react';
import { FlatList } from 'react-native';
import { Screen } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { useMostRepeated } from 'hooks/useMostRepeated';
import { EmptyPlaylist } from 'components/EmptyPlaylist';
import { HistoryItem } from 'components/SongItem/HistoryItem';

export function MostPlayedScreen() {
    const songs = useAppSelector(state => historySelectors.selectIds(state));
    var mostPlayedSongs = useMostRepeated(songs);

    if (!songs) return null;
    return (
        <Screen>
            <FlatList
                data={mostPlayedSongs}
                ListEmptyComponent={() => (
                    <EmptyPlaylist />
                )}
                keyExtractor={(index) => `history-${index.toString()}`}
                renderItem={({ item }) => <HistoryItem id={item} />}
            />
        </Screen>
    );
}
