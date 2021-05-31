import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { StackNavigationProp, StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import { addToQueue } from '../../actions/playerState';
import { filterSongsByGenre } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from 'components';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';
import { Container } from 'components';
import { SearchStackParamList } from './types';
import { RouteProp } from '@react-navigation/core';

type FilterScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Filter'
>;

type ProfileScreenRouteProp = RouteProp<SearchStackParamList, 'Filter'>;


type Props = {
  navigation: FilterScreenNavigationProp;
  route: ProfileScreenRouteProp;
};

export const FilterScreen = ({ navigation, route }: Props) => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { genre } = route.params;

  useEffect(() => {
    setIsLoading(true);
    fetchData().then(() => {
      setIsLoading(false);
    })
    navigation.setOptions({ addToQueue: addSongsToQueue });
  }, []);

  const addSongsToQueue = () => {
    dispatch(addToQueue(songs));
  };

  const fetchData = async () => {
    const data = await filterSongsByGenre(genre.title);
    setSongs(data);
  };


  if (isLoading) {
    return (
      <Screen>
        <Container style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
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
      <SongListContainer
        data={songs}
        fetchData={fetchData}
        title={genre.title}
        cover={genre.image}
      />
    </Screen>
  );
};
