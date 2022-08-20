import React from 'react';
import { SectionList, View } from 'react-native';
import { Screen, Title } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { EmptyPlaylist } from 'components/EmptyPlaylist';
import { HistoryItem } from 'components/SongItem/HistoryItem';
import groupBy from 'lodash/groupBy';
import map from 'lodash/map';
import orderBy from 'lodash/orderBy';
import dayjs from 'dayjs';

export function HistoryScreen() {
	const [refreshing, setRefreshing] = React.useState(false);
	const songs = useAppSelector(state => historySelectors.selectEntities(state));
	const [data, setData] = React.useState([]);


	function sortSongs() {
		setRefreshing(true);
		const grouping = groupBy(songs, element => element?.date)
		const sections = map(grouping, (items, date) => ({
			title: date,
			data: items
		}));
		const orderedSections = orderBy(sections, section => section.title, 'desc');
		setData(orderedSections);
		setRefreshing(false);
	}


	React.useEffect(() => {
		sortSongs();
	}, [])


	return (
		<Screen>
			<SectionList
				sections={data}
				ListEmptyComponent={() => (
					<EmptyPlaylist />
				)}
				renderSectionHeader={({ section: { title } }) => (
					<View style={{ marginVertical: 8, marginHorizontal: 4 }}>
						<Title >{dayjs(title, 'l').format("ddd, D MMM YYYY")}</Title>
					</View>
				)}
				refreshing={refreshing}
				onRefresh={sortSongs}
				keyExtractor={(item, index) => `history-${item}-${index}`}
				renderItem={({ item }) => <HistoryItem id={item.id} />}
			/>
		</Screen>
	);
}
