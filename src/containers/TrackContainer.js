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
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
    };
  }

  componentDidMount() {
    const { track, active } = this.props;
    if (!isUndefined(active) && track.id) {
      if (isEqual(active.id, track.id)) {
        this.setState({
          isActive: true,
        });
      }
    }
  }

  play = () => {
    const { track, loadTrackPlayer } = this.props;
    const { isActive } = this.state;
    if (!isActive) {
      requestAnimationFrame(() => {
        loadTrackPlayer(track);
      });
    }
  };

  render() {
    const { track } = this.props;
    const { isActive } = this.state;

    return <Track track={track} play={this.play} active={isActive} />;
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
