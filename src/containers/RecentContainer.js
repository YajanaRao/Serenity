import React, {PureComponent} from 'react';
import {connect} from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import Recent from '../components/Recent';
import {loadTrackPlayer, playTrack} from '../actions/playerState';

// FIXME: Testing the application
class RecentContainer extends PureComponent {
  play = track => {
    if (!isEmpty(track)) {
      this.props.loadTrackPlayer(track);
      this.props.playTrack();
    }
  };

  render() {
    if (!isEmpty(this.props.history)) {
      return <Recent history={this.props.history} play={this.play} />;
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

