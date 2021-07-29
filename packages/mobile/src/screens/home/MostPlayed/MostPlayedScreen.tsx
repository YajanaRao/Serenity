import React from 'react';
import { FlatList } from 'react-native';
import { Container, Screen, Title } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { SongItem } from '../../../components/SongItem/SongItem';
import { useMostRepeated } from 'hooks/useMostRepeated';

export function MostPlayedScreen() {
    const songs = useAppSelector(state => historySelectors.selectIds(state));
    var mostPlayedSongs = useMostRepeated(songs);

    if (!songs) return null;
    return (
        <Screen>
            <FlatList
                data={mostPlayedSongs}
                ListEmptyComponent={() => (
                    <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Title>No songs</Title>
                    </Container>
                )}
                keyExtractor={(item, index) => `history-${item}-${index}`}
                renderItem={({ item }) => <SongItem id={item} />}
            />
        </Screen>
    );
}
