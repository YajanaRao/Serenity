import React from 'react';
import { FlatList } from 'react-native';
import { Screen } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { SongItem } from 'components/SongItem/SongItem';
import { EmptyPlaylist } from 'components/EmptyPlaylist';

export function HistoryScreen() {
	const songs = useAppSelector(state => historySelectors.selectIds(state));

	if (!songs) return null;
	return (
		<Screen>
			<FlatList
				data={songs}
				ListEmptyComponent={() => (
					<EmptyPlaylist />
				)}
				keyExtractor={(item, index) => `history-${item}-${index}`}
				renderItem={({ item }) => <SongItem id={item} />}
			/>
		</Screen>
	);
}
