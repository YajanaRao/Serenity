import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import {
  playTrack,
  pauseTrack,
  loadTrackPlayer,
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../actions/playerState';
import PlayerBar from '../components/PlayerBar';

class PlayerBarContainer extends Component {
  componentDidMount() {
    const { active, setUpTrackPlayer, loadTrackPlayer } = this.props;
    setUpTrackPlayer();
    if (!isEmpty(active)) {
      loadTrackPlayer(active, false);
    }
  }

  componentWillUnmount() {
    const { destroyTrackPlayer } = this.props;
    destroyTrackPlayer();
  }

  togglePlayback = () => {
    const { status, pauseTrack, playTrack } = this.props;
    if (status === 'playing') {
      pauseTrack();
    } else {
      playTrack();
    }
  };

  navigateToPlayer = () => {
    const { navigation } = this.props;
    navigation.navigate('Player');
  };

  render() {
    const { active, status } = this.props;
    if (!isEmpty(active)) {
      return (
        <PlayerBar
          active={active}
          status={status}
          togglePlayback={this.togglePlayback}
          navigateToPlayer={this.navigateToPlayer}
        />
      );
    }
    return false;
  }
}

const mapStateToProps = state => ({
  active: state.playerState.active,
  status: state.playerState.status,
});

PlayerBarContainer.propTypes = {
  active: PropTypes.object.isRequired,
  status: PropTypes.string.isRequired,
  playTrack: PropTypes.func.isRequired,
  pauseTrack: PropTypes.func.isRequired,
  loadTrackPlayer: PropTypes.func.isRequired,
  destroyTrackPlayer: PropTypes.func.isRequired,
  setUpTrackPlayer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    playTrack,
    pauseTrack,
    loadTrackPlayer,
    destroyTrackPlayer,
    setUpTrackPlayer,
  },
)(withNavigation(PlayerBarContainer));
