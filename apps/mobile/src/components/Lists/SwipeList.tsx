import React, {useState, useCallback} from 'react';
import {Surface, IconButton, Divider} from 'react-native-paper';
import {View, StyleSheet, RefreshControl} from 'react-native';
import {SwipeListView} from 'react-native-swipe-list-view';

import {ListSongHeader} from '../ListSongHeader';
import {SongProps} from '@serenity/core';
import {Track} from 'components/Track';

interface ItemProps {
	item: SongProps;
}

interface Props {
	title: string;
	cover: string;
	addToQueue(songs: SongProps[] | SongProps): void;
	data: SongProps[];
	showModal(song: SongProps): void;
	fetchData(): void;
}

export const SwipeList = ({
	title,
	cover,
	addToQueue,
	data,
	showModal,
	fetchData,
}: Props) => {
	const [refreshing, setRefreshing] = useState(false);
	const refreshData = async () => {
		setRefreshing(true);
		await fetchData();
		setRefreshing(false);
	};
	const ListHeaderComponent = useCallback(() => {
		<ListSongHeader
			title={title}
			cover={cover}
			addSongsToQueue={() => addToQueue(data)}
		/>;
	}, [title, cover, addToQueue, data]);
	return (
		<SwipeListView
			data={data}
			ListHeaderComponent={ListHeaderComponent}
			ListFooterComponent={() => <View style={{height: 100}} />}
			ItemSeparatorComponent={() => <Divider inset />}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({item}: ItemProps) => <Track track={item} />}
			refreshControl={
				<RefreshControl
					refreshing={refreshing}
					onRefresh={refreshData}
					colors={['#12c2e9', '#c471ed', '#f64f59']}
				/>
			}
			renderHiddenItem={({item}) => (
				<Surface style={styles.rowBack}>
					<IconButton icon="playlist-play" onPress={() => addToQueue(item)} />
					<IconButton icon="playlist-plus" onPress={() => showModal(item)} />
				</Surface>
			)}
			leftOpenValue={75}
			rightOpenValue={-75}
		/>
	);
};

const styles = StyleSheet.create({
	rowBack: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		paddingLeft: 15,
		paddingRight: 15,
	},
});
