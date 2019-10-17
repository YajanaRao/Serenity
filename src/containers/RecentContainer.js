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

  play = track => {
    if (!isEmpty(track)) {
      this.props.loadTrackPlayer(track);
      this.props.playTrack();
    }
  };

  componentDidMount() {
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

  componentWillUnmount() {
    this.realmSongs.removeAllListeners();
  }

  render() {
    if (this.state.history.length) {
      return (
        <TrackScrollView
          title="Recent songs"
          data={this.state.history}
          play={this.play}
        />
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
