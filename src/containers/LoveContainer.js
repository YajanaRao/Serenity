import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { addToFavourite } from '../actions/playerState';

class LoveContainer extends PureComponent {
  addToFavourite = () => {
    this.props.addToFavourite(this.props.track);
  };

  render() {
    return (
      <View style={this.props.style}>
        <IconButton
          animated
          icon="favorite-border"
          onPress={this.addToFavourite}
        />
      </View>
    );
  }
}

LoveContainer.propTypes = {
  track: PropTypes.object,
};

export default connect(
  null,
  { addToFavourite },
)(LoveContainer);
