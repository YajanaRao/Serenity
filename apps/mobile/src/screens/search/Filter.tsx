import React, {useState, useEffect} from 'react';
import isEmpty from 'lodash/isEmpty';

import {StackNavigationProp} from '@react-navigation/stack';
import {ActivityIndicator, IconButton} from 'react-native-paper';
import {Container, Screen} from '@serenity/components';
import {RouteProp} from '@react-navigation/core';
import {filterSongsByGenre} from '@serenity/core/src/actions/media';
import {SongList} from '../../components/SongList';
import {EmptyPlaylist} from '../../components/EmptyPlaylist';
import {SearchStackParamList} from './types';
import {Songs} from '@serenity/extensions';

type FilterScreenNavigationProp = StackNavigationProp<
	SearchStackParamList,
	'Filter'
>;

type ProfileScreenRouteProp = RouteProp<SearchStackParamList, 'Filter'>;

type Props = {
	navigation: FilterScreenNavigationProp;
	route: ProfileScreenRouteProp;
};

export const FilterScreen = ({navigation, route}: Props) => {
	const [songs, setSongs] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const {genre, addToQueue} = route.params;

	navigation.setOptions({
		headerTitle: genre.title,
		headerRight: () => (
			<IconButton
				icon="play-circle-outline"
				onPress={() => addToQueue()}
				disabled={!songs.length}
			/>
		),
	});

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		setIsLoading(true);
		const data = await filterSongsByGenre(genre.title);
		const songs = await Songs.getSongs(genre);
		setSongs([...data, ...songs]);
		setIsLoading(false);
	};

	if (isLoading) {
		return (
			<Screen>
				<Container
					style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
					<ActivityIndicator />
				</Container>
			</Screen>
		);
	}
	if (isEmpty(songs)) {
		return <EmptyPlaylist />;
	}

	return (
		<Screen>
			<SongList
				data={songs}
				fetchData={fetchData}
				title={genre.title}
				cover={genre.image}
			/>
		</Screen>
	);
};
