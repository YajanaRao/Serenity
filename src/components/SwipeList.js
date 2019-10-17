import PropTypes from 'prop-types';
import React from 'react';
import {
  Surface,
  IconButton,
  Divider,
  Portal,
  Dialog,
  Title,
} from 'react-native-paper';
import { View, StyleSheet, ScrollView, RefreshControl } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import isEmpty from 'lodash/isEmpty';

import TrackContainer from '../containers/TrackContainer';
import PlaylistComponent from './PlaylistComponent';
import ListSongHeader from './ListSongHeader';

class SwipeList extends React.Component {
  state = {
    visible: false,
    song: null,
    refreshing: false,
  };

  addToPlaylist = (id, song) => {
    const { addToPlaylist } = this.props;
    addToPlaylist(id, song);
    this.hideModal();
  };

  addSongsToQueue = () => {
    const { data, addToQueue } = this.props;
    addToQueue(data);
  };

  showModal = song => {
    this.setState({
      visible: true,
      song,
    });
  };

  hideModal = () => {
    this.setState({
      visible: false,
      song: null,
    });
  };

  refreshData = async () => {
    const { fetchData } = this.props;
    this.setState({
      refreshing: true,
    });
    await fetchData();
    this.setState({
      refreshing: false,
    });
  };

  render() {
    const { data, title, cover } = this.props;
    const { song, visible, refreshing } = this.state;
    return (
      <View>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideModal}>
            <Dialog.ScrollArea>
              <ScrollView
                contentContainerStyle={{
                  marginHorizontal: 16,
                  marginVertical: 16,
                }}
              >
                <Title style={{ textAlign: 'center' }}>Add to Playlist</Title>
                <PlaylistComponent
                  song={song}
                  addToPlaylist={this.addToPlaylist}
                />
              </ScrollView>
            </Dialog.ScrollArea>
          </Dialog>
        </Portal>
        <SwipeListView
          data={data}
          ListHeaderComponent={() => (
            <ListSongHeader
              title={title}
              cover={cover}
              isEmpty={isEmpty(data)}
              addSongsToQueue={this.addSongsToQueue}
            />
          )}
          ListFooterComponent={() => <View style={{ height: 100 }} />}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TrackContainer track={item} />}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.refreshData}
            />
          }
          renderHiddenItem={({ item }) => (
            <Surface style={styles.rowBack}>
              <IconButton
                icon="add-to-queue"
                onPress={() => this.props.addToQueue(item)}
              />
              <IconButton icon="queue" onPress={() => this.showModal(item)} />
            </Surface>
          )}
          leftOpenValue={75}
          rightOpenValue={-75}
        />
      </View>
    );
  }
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
