import React, { PureComponent } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Caption } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';

import { getPlayedSongs, getFavoriteSongs } from '../actions/realmAction';
import { startRadio } from '../actions/playerState';
import { mostPlayedSongs } from '../actions/mediaStore';

class ShortCutContainer extends PureComponent {
  mostPlayed = () => {
    return mostPlayedSongs(getPlayedSongs());
  };

  navigateToHistory = () => {
    const { navigation } = this.props;
    const playlist = {
      id: 'user-playlist--000001',
      name: 'Recently Played Songs',
      owner: 'Serenity',
    };
    navigation.navigate('Playlist', {
      playlist,
      fetchSongs: getPlayedSongs,
    });
  };

  navigateToFavorite = () => {
    const { navigation } = this.props;
    const playlist = {
      id: 'user-playlist--000002',
      name: 'Liked Songs',
      owner: 'Serenity',
    };
    navigation.navigate('Playlist', {
      playlist,
      fetchSongs: getFavoriteSongs,
    });
  };

  navigateToMostPlayed = () => {
    const { navigation } = this.props;

    const playlist = {
      id: 'user-playlist--000002',
      name: 'Most Played Songs',
      owner: 'Serenity',
    };
    navigation.navigate('Playlist', {
      playlist,
      fetchSongs: this.mostPlayed,
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
          <Avatar.Icon
            icon="history"
            color="#46b3e6"
            style={{ backgroundColor: 'lightblue' }}
          />
          <Caption>History</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.navigateToFavorite}
        >
          <Avatar.Icon
            icon="heart-outline"
            color="#c70d3a"
            style={{ backgroundColor: '#ffbbcc' }}
          />
          <Caption>Favorite</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.navigateToMostPlayed}
        >
          <Avatar.Icon
            icon="trending-up"
            color="#2a1a5e"
            style={{ backgroundColor: '#ac8daf' }}
          />
          <Caption>Most Played</Caption>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ justifyContent: 'center', alignItems: 'center' }}
          onPress={this.startRadio}
        >
          <Avatar.Icon
            icon="radio"
            color="#1f6650"
            style={{ backgroundColor: '#c0ffb3' }}
          />
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
