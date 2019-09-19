import React, { PureComponent } from 'react';
import { connect } from 'react-redux';

import TrackScrollView from '../components/TrackScrollView';
import { loadTrackPlayer, playTrack } from '../actions/playerState';

// FIXME: Testing the application
class RecentContainer extends PureComponent {
  play = track => {
    if (!isEmpty(track)) {
      this.props.loadTrackPlayer(track);
      this.props.playTrack();
    }
  };

  render() {
    if (this.props.history.length > 3) {
      return <TrackScrollView
        title={'Recent songs'}
        data={this.props.history}
        play={this.play}
      />
    }
    return false;
  }
}

const mapStateToProps = state => ({
  history: state.playerState.history,
});

export default connect(
  mapStateToProps,
  {
    loadTrackPlayer,
    playTrack,
  },
)(RecentContainer);
