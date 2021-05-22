import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { StackScreenProps } from '@react-navigation/stack';
import { ActivityIndicator } from 'react-native-paper';
import { addToQueue } from '../../actions/playerState';
import { filterSongsByGenre } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from 'components';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';
import { Container } from 'components';

export const FilterScreen = ({ navigation, route }: StackScreenProps<any>) => {
  const [songs, setSongs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

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
    const genre = route.params.genre.title;
    const data = await filterSongsByGenre(genre);
    setSongs(data);
  };

  const { genre } = route.params;

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
