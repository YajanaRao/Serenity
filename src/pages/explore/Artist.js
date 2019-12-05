import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { withTheme, Avatar, List } from 'react-native-paper';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import remove from 'lodash/remove';

import FollowArtistDialog from '../../containers/FollowArtistDialog';
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
      visible: false,
      addArtists: [],
      artists,
    };
  }

  componentDidMount() {
    try {
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

  selectArtist = artist => {
    const { addArtists } = this.state;
    addArtists.push(artist);
  };

  removeArtist = artist => {
    const { addArtists } = this.state;
    const artists = remove(addArtists, function(item) {
      return item.id === artist.id;
    });
    this.setState({
      addArtists: artists,
    });
  };

  addArtists = () => {
    const { addArtists } = this.state;
    addArtists.forEach(artist => addArtist(artist));
    this.hideDialog();
  };

  showDialog = () => this.setState({ visible: true });

  hideDialog = () => this.setState({ visible: false });

  render() {
    const {
      theme: { colors },
      navigation: { navigate },
    } = this.props;
    const { visible, artists } = this.state;
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
        <FollowArtistDialog
          visible={visible}
          hideDialog={this.hideDialog}
          addArtists={this.addArtists}
          selectArtist={this.selectArtist}
          removeArtist={this.removeArtist}
        />
      </Screen>
    );
  }
}

const mapStateToProps = state => ({
  data: state.mediaStore.artists,
});

export default connect(mapStateToProps)(withTheme(Artist));

Artist.propTypes = {
  theme: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
