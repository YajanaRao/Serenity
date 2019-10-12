import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import { addToFavourite } from '../actions/playerState';

class Love extends PureComponent {

  addToFavourite = () => {
    this.props.addToFavourite(this.props.track)
  }

  render() {
    return (
      <View style={this.props.style}>
        <IconButton
          animated={true}
          icon="favorite-border"
          onPress={this.addToFavourite}
        />
      </View>
    );
  }
}


export default connect(
  null,
  { addToFavourite },
)(Love);
