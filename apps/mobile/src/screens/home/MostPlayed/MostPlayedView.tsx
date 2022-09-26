import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/core';
import { historySelectors, Player, SongProps, useAppDispatch, useAppSelector } from '@serenity/core';
import { Headline } from '@serenity/components';
import { TrackItem } from './components/TrackItem';
import { useMostRepeated } from 'hooks/useMostRepeated';


export const MostPlayed = () => {
  const navigation = useNavigation();
  const history = useAppSelector(state => historySelectors.selectIds(state))
  var mostPlayedSongs = useMostRepeated(history);

  const dispatch = useAppDispatch();

  const play = (track: SongProps) => {
    if (!isEmpty(track)) {
      dispatch(Player.playSong(track));
    }
  };

  const navigateToSongs = React.useMemo(
    () => () => {
      navigation.navigate('MostPlayed');
    },
    [navigation],
  );

  if (history.length > 3) {
    return (
      <View>
        <View style={styles.container}>
          <Headline>Most Played</Headline>
          {history.length > 3 && (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          )}
        </View>
        <FlatList
          horizontal
          data={mostPlayedSongs}
          keyExtractor={(item, index) => `most-played-${item}-${index}`}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={play} />}
        />
      </View>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginBottom: 8,
  }
});