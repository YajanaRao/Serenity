import React, {Component} from 'react';
import {View} from 'react-native';
import {
  List,
  withTheme,
  Portal,
  Dialog,
  TextInput,
  Button,
} from 'react-native-paper';
import {connect} from 'react-redux';
import {isEqual, isEmpty, size} from 'lodash';

class Playlist extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    favorite: [],
    playlist: '',
    visible: false,
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

  _showDialog = () => this.setState({visible: true});

  _hideDialog = () => this.setState({visible: false});

  render() {
    const {colors} = this.props.theme;
    return (
      <View style={{flex: 1, backgroundColor: colors.background}}>
        <Portal>
          <Dialog visible={this.state.visible} onDismiss={this._hideDialog}>
            <Dialog.Title>Enter your playlist name</Dialog.Title>
            <Dialog.Content>
              <TextInput
                mode="outlined"
                label="Playlist Name"
                value={this.state.playlist}
                onChangeText={playlist => this.setState({playlist})}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Cancel</Button>
              <Button onPress={this._hideDialog}>Create</Button>
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
        <List.Item
          title="My Fav"
          description="by you"
          left={props => <List.Icon {...props} icon="audiotrack" />}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  favorite: state.playerState.favorite,
});

export default connect(mapStateToProps)(withTheme(Playlist));
