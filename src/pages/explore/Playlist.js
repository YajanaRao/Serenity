import React, { Component } from 'react';
import { View } from 'react-native';
import {
  List,
  Portal,
  Dialog,
  TextInput,
  Button,
  withTheme,
} from 'react-native-paper';
import { FlatList } from 'react-navigation';
import PropTypes from 'prop-types';
import { getAllPlaylists, createPlaylist } from '../../actions/realmAction';
import realm from '../../database';

class Playlist extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      playlistName: null,
      playlists: [],
    };

    realm.addListener('change', () => {
      this.setState({
        playlists: getAllPlaylists(),
      });
    });
  }

  static navigationOptions = {
    header: null,
  };

  navigateToCollection = playlist => {
    this.props.navigation.navigate('Songs', {
      playlist,
    });
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  createPlaylist = () => {
    this.hideDialog();
    if (this.state.playlistName) {
      createPlaylist(this.state.playlistName);
      this.setState({ playlistName: null });
    }
  };

  componentDidMount() {
    this.setState({
      playlists: getAllPlaylists(),
    });
  }

  componentWillUnmount() {
    realm.removeAllListeners();
  }

  onChangeText = text => {
    this.setState({ playlistName: text });
  };

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Enter your playlist name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={this.state.playlistName}
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
          data={this.state.playlists}
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
      </View>
    );
  }
}

Playlist.propTypes = {
  navigation: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Playlist);
