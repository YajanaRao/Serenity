import React from 'react';
import { SectionList, View } from 'react-native';
import { Screen, Title } from '@serenity/components';
import { useAppSelector, historySelectors } from '@serenity/core';
import { EmptyPlaylist } from 'components/EmptyPlaylist';
import { HistoryItem } from 'components/SongItem/HistoryItem';
import _ from 'lodash';
import moment from 'moment';

export function HistoryScreen() {
	const songs = useAppSelector(state => historySelectors.selectEntities(state));
	const [data, setData] = React.useState([]);


	React.useEffect(() => {
		const grouping = _.groupBy(songs, element => moment(element.date).format("ddd, D MMM YYYY"))
		const sections = _.map(grouping, (items, date) => ({
			title: date,
			data: items
		}));
		setData(sections);
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
						<Title >{title}</Title>
					</View>
				)}
				keyExtractor={(item, index) => `history-${item}-${index}`}
				renderItem={({ item }) => <HistoryItem id={item.id} />}
			/>
		</Screen>
	);
	return null;
}
