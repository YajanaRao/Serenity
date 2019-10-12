import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';

import TrackScrollView from '../components/TrackScrollView';
import { loadTrackPlayer, playTrack } from '../actions/playerState';
import { getPlayedSongs } from '../actions/realmAction';

// FIXME: Testing the application
class RecentContainer extends PureComponent {
  state = {
    history: []
  }
  play = track => {
    if (!isEmpty(track)) {
      this.props.loadTrackPlayer(track);
      this.props.playTrack();
    }
  };

  componentDidMount() {
    this.setState({
      history: getPlayedSongs()
    })
  }

  render() {
    if (this.state.history.length > 3) {
      return <TrackScrollView
        title={'Recent songs'}
        data={this.state.history}
        play={this.play}
      />
    }
    return false;
  }
}


export default connect(null,
  {
    loadTrackPlayer,
    playTrack,
  },
)(RecentContainer);
