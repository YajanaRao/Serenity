import React from 'react';
import { FlatList } from 'react-native';
import { Container, Screen, Title } from '@serenity/components';
import { selectHistorySongs, useAppSelector } from '@serenity/core';
import { SongItem } from '../../components/SongItem/SongItem';
import { historySelectors } from '@serenity/core/src/features/player/historySlice';

export function HistoryScreen() {
	const songs = useAppSelector(state => historySelectors.selectIds(state));

	if (!songs) return null;
	return (
		<Screen>
			<FlatList
				data={songs}
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
