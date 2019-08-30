import React, {Component} from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import {withNavigation} from 'react-navigation';
import {connect} from 'react-redux';
import {isEqual, isEmpty, isString} from 'lodash';
import FastImage from 'react-native-fast-image';
import {Surface, Subheading, Caption, IconButton} from 'react-native-paper';

import {
  playTrack,
  pauseTrack,
  loadTrackPlayer,
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../actions/playerState';
import PlayerBar from '../components/PlayerBar';

class MiniPlayer extends Component {


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
    this.props.navigation.navigate('Player')
  }

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

export default connect(
  mapStateToProps,
  {
    playTrack,
    pauseTrack,
    loadTrackPlayer,
    destroyTrackPlayer,
    setUpTrackPlayer,
  },
)(withNavigation(MiniPlayer));

const styles = StyleSheet.create({
  playBar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    elevation: 0,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
