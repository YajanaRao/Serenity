import React, { Component } from 'react';
import { List, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { FlatList } from 'react-navigation';
import values from 'lodash/values';

import { getAllPlaylists, createPlaylist } from '../../actions/realmAction';
import Screen from '../../components/Screen';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.realmPlaylists = getAllPlaylists();
    const playlists = values(this.realmPlaylists);
    this.state = {
      visible: false,
      playlistName: null,
      playlists,
    };
  }

  componentDidMount() {
    this.realmPlaylists.addListener((playlists, changes) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        this.setState({
          playlists: values(playlists),
        });
      }
    });
  }

  componentWillUnmount() {
    this.realmPlaylists.removeAllListeners();
  }

  navigateToCollection = playlist => {
    const { navigation } = this.props;
    navigation.navigate('Songs', {
      playlist,
    });
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  createPlaylist = () => {
    const { playlistName } = this.state;
    this.hideDialog();
    if (playlistName) {
      createPlaylist(playlistName);
      this.setState({ playlistName: null });
    }
  };

  onChangeText = text => {
    this.setState({ playlistName: text });
  };

  
  static navigationOptions = {
    header: null,
  };

  render() {
    const { visible, playlistName, playlists } = this.state;
    return (
      <Screen>
        <Portal>
          <Dialog visible={visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Enter your playlist name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={playlistName}
                onChangeText={this.onChangeText}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Cancel</Button>
              <Button onPress={this.createPlaylist}>Create</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <FlatList
          ListHeaderComponent={() => (
            <List.Item
              title="Create Playlist"
              left={props => <List.Icon {...props} icon="add" />}
              onPress={this.showDialog}
            />
          )}
          data={playlists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={`by ${item.owner}`}
              left={props => <List.Icon {...props} icon="audiotrack" />}
              onPress={() => this.navigateToCollection(item)}
            />
          )}
        />
      </Screen>
    );
  }
}

export default Playlist;
