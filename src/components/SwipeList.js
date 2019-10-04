import React, { useState } from 'react';
import { Surface, IconButton, Divider, Button, Dialog, Portal, List, Title } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';

import TrackContainer from '../containers/TrackContainer';
import PlaylistComponent from './PlaylistComponent';
import { addSong } from '../actions/realmAction';

class SwipeList extends React.Component {
  state = {
    visible: false,
    song: null
  }

  addToPlaylist = (id, song) => {
    addSong(id, song);
    this._hideModal();
  }

  _showModal = (song) => {
    this.setState({
      visible: true,
      song: song
    })
  }

  _hideModal = () => {
    this.setState({
      visible: false,
      song: null
    })
  }

  render() {
    return (
      <View>
        <Portal>
          <Dialog
            visible={this.state.visible}
            onDismiss={this._hideModal}>
            {/* <Dialog.Title></Dialog.Title> */}
            <Dialog.ScrollArea>
              <ScrollView contentContainerStyle={{ marginHorizontal: 16, marginVertical: 16 }}>
                <Title style={{ textAlign: 'center' }}>Add to Playlist</Title>
                <List.Item
                  title="Favorite"
                  description={'Favorite Songs'}
                  left={props => <List.Icon {...props} icon="favorite" />}
                  onPress={() => props.addToFavorite(this.state.song)}
                />
                <PlaylistComponent song={this.state.song} addToPlaylist={this.addToPlaylist} />
              </ScrollView>
            </Dialog.ScrollArea>
            {/* <Dialog.Content>
              <List.Item
                title="Create Playlist"
                left={props => <List.Icon {...props} icon="add" />}
              />
              <List.Item
                title="Favorite"
                description={'Favorite Songs'}
                left={props => <List.Icon {...props} icon="favorite" />}
              />
            </Dialog.Content> */}
            {/* <Dialog.Actions>
              <Button onPress={() => setVisible(false)}>Cancel</Button>
              <Button onPress={() => props.addToFavorite(song)}>Done</Button>
            </Dialog.Actions> */}
          </Dialog>
        </Portal>
        <SwipeListView
          data={this.props.data}
          ItemSeparatorComponent={() => <Divider inset={true} />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => <TrackContainer track={item} />}
          renderHiddenItem={({ item }) => (
            <Surface style={styles.rowBack}>
              <IconButton
                icon="add-to-queue"
                onPress={() => this.props.addToQueue(item)}
              />
              <IconButton
                icon="queue"
                onPress={() => this._showModal(item)}
              />
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

const styles = StyleSheet.create({
  rowBack: {
    alignItems: 'center',
    // backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
  }
});