import React, { Component } from 'react';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import {
  playTrack,
  pauseTrack,
  loadTrack,
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../actions/playerState';
import PlayerBar from '../components/PlayerBar';

class PlayerBarContainer extends Component {
  componentDidMount() {
    const { active, setUpTrackPlayer, loadTrack } = this.props;
    setUpTrackPlayer();
    if (!isEmpty(active)) {
      loadTrack(active, false);
    }
  }

  componentWillUnmount() {
    const { destroyTrackPlayer } = this.props;
    destroyTrackPlayer();
  }

  togglePlayback = () => {
    const { status } = this.props;
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
  loadTrack: PropTypes.func.isRequired,
  destroyTrackPlayer: PropTypes.func.isRequired,
  setUpTrackPlayer: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    loadTrack,
    destroyTrackPlayer,
    setUpTrackPlayer,
  },
)(withNavigation(PlayerBarContainer));
