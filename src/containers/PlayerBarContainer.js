import React, {Component} from 'react';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {isEmpty} from 'lodash';
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
    this.props.setUpTrackPlayer();
    if (!isEmpty(this.props.active)) {
      this.props.loadTrackPlayer(this.props.active, false);
    }
  }

  componentWillUnmount() {
    this.props.destroyTrackPlayer();
  }

  togglePlayback = () => {
    if (this.props.status == 'playing') {
      this.props.pauseTrack();
    } else {
      this.props.playTrack();
    }
  };

  navigateToPlayer = () => {
    this.props.navigation.navigate('Player');
  };

  render() {
    if (!isEmpty(this.props.active)) {
      return (
        <PlayerBar
          active={this.props.active}
          status={this.props.status}
          togglePlayback={this.togglePlayback}
          navigateToPlayer={this.navigateToPlayer}
        />
      );
    } else {
      return false;
    }
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
