import React from 'react';
import { SectionList, View } from 'react-native';
import { Screen, Title } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { EmptyPlaylist } from 'components/EmptyPlaylist';
import { HistoryItem } from 'components/SongItem/HistoryItem';
import _ from 'lodash';
import moment from 'moment';

export function HistoryScreen() {
	const [refreshing, setRefreshing] = React.useState(false);
	const songs = useAppSelector(state => historySelectors.selectEntities(state));
	const [data, setData] = React.useState([]);


	function sortSongs() {
		setRefreshing(true);
		const grouping = _.groupBy(songs, element => moment(element.date).format('l'))
		const sections = _.map(grouping, (items, date) => ({
			title: date,
			data: items
		}));
		const orderedSections = _.orderBy(sections, section => section.title, 'desc');
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
						<Title >{moment(title).format("ddd, D MMM YYYY")}</Title>
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
