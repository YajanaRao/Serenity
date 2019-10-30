import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
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

  render() {
    const { history } = this.state;
    if (history.length) {
      return (
        <TrackScrollView title="Recent songs" data={history} play={this.play} />
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
)(RecentContainer);
