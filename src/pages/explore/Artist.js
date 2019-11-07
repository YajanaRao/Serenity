import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import {
  withTheme,
  Avatar,
  List,
  Dialog,
  Portal,
  Button,
  Searchbar,
  ActivityIndicator,
} from 'react-native-paper';
import PropTypes from 'prop-types';

import ArtistComponent from '../../components/ArtistComponent';
import { addArtist, getArtists } from '../../actions/realmAction';
import { deserializeArtists } from '../../utils/database';
import log from '../../utils/logging';
import Screen from '../../components/Screen';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.realmArtists = getArtists();
    const artists = deserializeArtists(this.realmArtists);
    this.state = {
      data: [],
      visible: false,
      addArtists: [],
      artists,
    };
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/ju7jj3uttzw1vow/artist.json?dl=0',
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            data: responseJson,
          });
        })
        .catch(error => {
          log(error);
          this.setState({
            visible: false,
          });
        });
      this.realmArtists.addListener((artists, changes) => {
        if (
          changes.insertions.length > 0 ||
          changes.modifications.length > 0 ||
          changes.deletions.length > 0
        ) {
          this.setState({
            artists: deserializeArtists(artists),
          });
        }
      });
    } catch (error) {
      log(error);
    }
  }

  componentWillUnmount() {
    this.realmArtists.removeAllListeners();
  }

  addArtistsToArray = artist => {
    const { addArtists } = this.state;
    addArtists.push(artist);
  };

  addArtists = () => {
    const { addArtists } = this.state;
    addArtist(addArtists);
    this.hideDialog();
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      theme: { colors },
      navigation: { navigate },
    } = this.props;
    const { visible, firstQuery, artists, data } = this.state;
    return (
      <Screen>
        <FlatList
          ListHeaderComponent={() => (
            <List.Item
              title="Add artist"
              left={() => (
                <Avatar.Icon
                  // {...props}
                  style={{ backgroundColor: colors.surface }}
                  icon="plus"
                />
              )}
              onPress={this.showDialog}
            />
          )}
          data={artists}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <List.Item
              title={item.name}
              left={() => <Avatar.Image source={{ uri: item.cover }} />}
              onPress={() => {
                navigate('ArtistSongs', {
                  artist: item,
                });
              }}
            />
          )}
        />
        <Portal>
          <Dialog visible={visible} onDismiss={this.hideDialog}>
            <Dialog.Title>Choose more artists you like.</Dialog.Title>
            <Dialog.Content>
              <Searchbar
                placeholder="Search"
                onChangeText={query => {
                  this.setState({ firstQuery: query });
                }}
                value={firstQuery}
              />
            </Dialog.Content>
            <Dialog.ScrollArea>
              {data.length ? (
                <FlatList
                  data={data}
                  keyExtractor={(item, index) => index.toString()}
                  numColumns={2}
                  renderItem={({ item }) => (
                    <ArtistComponent
                      item={item}
                      addArtist={this.addArtistsToArray}
                    />
                  )}
                />
              ) : (
                <View style={{ margin: 16 }}>
                  <ActivityIndicator size="large" />
                </View>
              )}
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this.hideDialog}>Cancel</Button>
              <Button onPress={this.addArtists}>Ok</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </Screen>
    );
  }
}
export default withTheme(Artist);

Artist.propTypes = {
  theme: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
