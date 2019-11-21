import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Caption } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getPlayedSongs, getFavoriteSongs } from '../actions/realmAction';
import { startRadio } from '../actions/playerState';

class ShortCutContainer extends PureComponent {
  navigateToHistory = () => {
    const { navigation } = this.props;
    const playlist = {
      id: 'user-playlist--000001',
      name: 'Recently Played Songs',
      owner: 'Serenity',
      songs: getPlayedSongs(),
    };
    navigation.navigate('Playlist', {
      playlist,
    });
  };

  navigateToFavorite = () => {
    const { navigation } = this.props;
    const playlist = {
      id: 'user-playlist--000002',
      name: 'Liked Songs',
      owner: 'Serenity',
      songs: getFavoriteSongs(),
    };
    navigation.navigate('Playlist', {
      playlist,
    });
  };

  startRadio = () => {
    const { startRadio } = this.props;
    startRadio();
  };

  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          margin: 16,
        }}
      >
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.navigateToHistory}
        >
          <Avatar.Icon icon="history" />
          <Caption>History</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.navigateToFavorite}
        >
          <Avatar.Icon icon="heart-outline" color="#c70d3a" />
          <Caption>Favorite</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.startRadio}
        >
          <Avatar.Icon icon="radio" color="#1f6650" />
          <Caption>Radio</Caption>
        </TouchableOpacity>
      </View>
    );
  }
}

export default connect(
  null,
  { startRadio },
)(withNavigation(ShortCutContainer));
