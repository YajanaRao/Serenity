import React from 'react';
import { View, ViewStyle, FlatList } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { historySelectors, Player, useAppDispatch, useAppSelector } from '@serenity/core';
import { Headline } from '@serenity/components';
import { TrackProps } from '~/utils/types';
import { TrackItem } from '../../components/TrackItem';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginLeft: 16,
  marginBottom: 8,
};

export const MostPlayedContainer = () => {
  const navigation = useNavigation();
  const history = useAppSelector(state => historySelectors.selectIds(state))

  const dispatch = useAppDispatch();

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(Player.playSong(track));
    }
  };

  const navigateToSongs = React.useMemo(
    () => () => {
      navigation.navigate('History');
    },
    [navigation],
  );

  if (history.length) {
    return (
      <View>
        <View style={CONTAINER}>
          <Headline>Most Played</Headline>
          {history.length > 3 ? (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          ) : null}
        </View>
        <FlatList
          horizontal
          data={history}
          keyExtractor={(item, index) => `most-played-${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={play} />}
        />
      </View>
    );
  }
  return null;
};
