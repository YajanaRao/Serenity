import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Surface, IconButton, Divider } from 'react-native-paper';
import { View, StyleSheet, RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';

import TrackContainer from '../containers/TrackContainer';
import ListSongHeader from './ListSongHeader';

function SwipeList({ title, cover, addToQueue, data, showModal, fetchData }) {
  const [refreshing, setRefreshing] = useState(false);
  async function refreshData() {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  }

  return (
    <SwipeListView
      data={data}
      ListHeaderComponent={() => (
        <ListSongHeader
          title={title}
          cover={cover}
          isEmpty={isEmpty(data)}
          addSongsToQueue={() => addToQueue(data)}
        />
      )}
      ListFooterComponent={() => <View style={{ height: 100 }} />}
      ItemSeparatorComponent={() => <Divider inset />}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => <TrackContainer track={item} />}
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
}

export default SwipeList;

SwipeList.propTypes = {
  data: PropTypes.array,
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
