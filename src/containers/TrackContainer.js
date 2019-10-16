import React from 'react';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import PropTypes from 'prop-types';
import { loadTrackPlayer, playTrack } from '../actions/playerState';
import Track from '../components/Track';

/*
    TODO: 
    - may not be required for all render 
    - Adding duration would enhance the user experience
    - Testing has to be done
*/

// FIXME: Testing the application
class TrackContainer extends React.Component {
  state = {
    isActive: false,
    track: {},
  };

  componentDidMount() {
    const { track, active } = this.props;
    if (!isUndefined(active)) {
      if (isEqual(active.id, track.id)) {
        this.setState({
          isActive: true,
        });
      }
    }
  }

  play = () => {
    const { track } = this.props;
    if (!this.state.isActive) {
      this.props.loadTrackPlayer(track);
    }
  };

  render() {
    const { track } = this.props;

    return (
      <Track track={track} play={this.play} active={this.state.isActive} />
    );
  }
}

const mapStateToProps = state => ({
  active: state.playerState.active,
});

TrackContainer.propTypes = {
  active: PropTypes.object.isRequired,
  track: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { loadTrackPlayer, playTrack },
)(TrackContainer);
