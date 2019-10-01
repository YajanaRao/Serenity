import React, { Component } from 'react';
import { View } from 'react-native';
import { List, withTheme, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { connect } from 'react-redux';
import { isEqual, isEmpty, size } from 'lodash';
import { FlatList } from 'react-native-gesture-handler';
import { getAllPlaylists, createPlaylist } from '../../actions/realmAction'


class Playlist extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    favorite: [],
    visible: false,
    playlistName: null,
    playlists: []
  };

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.favorite, state.favorite)) {
      return {
        favorite: props.favorite,
      };
    }
    return null;
  }

  navigateToSongs = () => {
    if (!isEmpty(this.state.favorite)) {
      this.props.navigation.navigate('Songs', {
        songs: this.state.favorite,
        title: 'Favorites',
      });
    }
  };

  navigateToCollection = (playlist) => {
    this.props.navigation.navigate('Songs', {
      songs: playlist.songs,
      title: playlist.name,
      id: playlist.id
    })
  }


  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false });

  _createPlaylist = () => {
    if (this.state.playlistName) {
      this.setState({ playlists: createPlaylist(this.state.playlistName) });
    }
    this._hideDialog();

  }

  componentDidMount() {
    this.setState({
      playlists: getAllPlaylists()
    })
  }

  render() {
    const { colors } = this.props.theme;
    return (
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>Enter your playlist name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={this.state.playlistName}
                onChangeText={playlistName => this.setState({ playlistName })}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Cancel</Button>
              <Button onPress={this._createPlaylist}>Create</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <List.Item
          title="Create Playlist"
          left={props => <List.Icon {...props} icon="add" />}
          onPress={this._showDialog}
        />
        <List.Item
          title="Favorite"
          description={size(this.state.favorite) + ' Favorite Songs'}
          left={props => <List.Icon {...props} icon="favorite" />}
          onPress={this.navigateToSongs}
        />
        <FlatList
          data={this.state.playlists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              description={"by you "+ item.id}
              left={props => <List.Icon {...props} icon="audiotrack" />}
              onPress={() => this.navigateToCollection(item)}
            />
          )}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.playerState.favorite,
});

export default connect(mapStateToProps)(withTheme(Playlist));
