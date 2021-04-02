import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import { StackScreenProps } from '@react-navigation/stack';
import { addToQueue } from '../../actions/playerState';
import { filterSongsByGenre } from '../../actions/mediaStore';
import { SongListContainer } from '../../containers/SongListContainer';
import { Screen } from '../../components/Screen';
import { EmptyPlaylist } from '../../components/EmptyPlaylist';

export const FilterScreen = ({ navigation, route }: StackScreenProps<any>) => {
  const [songs, setSongs] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchData();
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
