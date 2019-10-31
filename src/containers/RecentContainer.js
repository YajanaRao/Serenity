import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Title, Button } from 'react-native-paper';
import { withNavigation } from 'react-navigation';

import { deserializeSongs } from '../utils/database';
import TrackScrollView from '../components/TrackScrollView';
import { loadTrackPlayer, playTrack } from '../actions/playerState';
import { getPlayedSongs } from '../actions/realmAction';

// FIXME: Testing the application
class RecentContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.realmSongs = getPlayedSongs();
    const history = deserializeSongs(this.realmSongs);
    this.state = {
      history,
    };
  }

  componentDidMount() {
    const { history } = this.state;
    if (history.length) {
      this.realmSongs.addListener((songs, changes) => {
        if (
          changes.insertions.length > 0 ||
          changes.modifications.length > 0 ||
          changes.deletions.length > 0
        ) {
          const song = deserializeSongs(songs);
          this.setState({
            history: song,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    const { history } = this.state;
    if (history.length) {
      this.realmSongs.removeAllListeners();
    }
  }

  play = track => {
    const { loadTrackPlayer, playTrack } = this.props;
    if (!isEmpty(track)) {
      loadTrackPlayer(track);
      playTrack();
    }
  };

  navigateToSongs = () => {
    const { navigation } = this.props;
    const { history } = this.state;
    const playlist = {
      id: 'user-playlist--000001',
      name: 'Recent songs',
      songs: history,
    };
    navigation.navigate('Playlist', {
      playlist,
    });
  };

  render() {
    const { history } = this.state;
    if (history.length) {
      return (
        <View>
          <View
            style={{
              marginHorizontal: 16,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Title>Recent songs</Title>
            <Button onPress={this.navigateToSongs}>More</Button>
          </View>
          <TrackScrollView data={history} play={this.play} />
        </View>
      );
    }
    return false;
  }
}

export default connect(
  null,
  {
    loadTrackPlayer,
    playTrack,
  },
)(withNavigation(RecentContainer));
