import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import values from 'lodash/values';

import TrackScrollView from '../components/TrackScrollView';
import { loadTrackPlayer, playTrack } from '../actions/playerState';
import { getPlayedSongs } from '../actions/realmAction';

// FIXME: Testing the application
class RecentContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.realmSongs = getPlayedSongs();
    const history = values(this.realmSongs);
    this.state = {
      history,
    };
  }

  componentDidMount() {
    console.log("history", this.state.history);
    if (this.state.history.length) {
      this.realmSongs.addListener((songs, changes) => {
        if (
          changes.insertions.length > 0 ||
          changes.modifications.length > 0 ||
          changes.deletions.length > 0
        ) {
          const history = values(songs);
          this.setState({
            history,
          });
        }
      });
    }
  }

  componentWillUnmount() {
    if (this.realmSongs.length) {
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
