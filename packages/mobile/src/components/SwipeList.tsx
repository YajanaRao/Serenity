import React, { useState } from 'react';
import { Surface, IconButton, Divider } from 'react-native-paper';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import { TrackContainer } from '../containers/TrackContainer';
import { ListSongHeader } from './ListSongHeader';
import { TrackProps } from '../utils/types';

interface ItemProps {
  item: TrackProps;
}

interface Props {
  title: string;
  cover: string;
  addToQueue(songs: TrackProps[] | TrackProps): void;
  data: TrackProps[];
  showModal(song: TrackProps): void;
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

  return (
    <SwipeListView
      data={data}
      ListHeaderComponent={() => (
        <ListSongHeader
          title={title}
          cover={cover}
          addSongsToQueue={() => addToQueue(data)}
        />
      )}
      ListFooterComponent={() => <View style={{ height: 100 }} />}
      ItemSeparatorComponent={() => <Divider inset />}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }: ItemProps) => <TrackContainer track={item} />}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={refreshData}
          colors={['#12c2e9', '#c471ed', '#f64f59']}
        />
      }
      renderHiddenItem={({ item }) => (
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
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  },
});
