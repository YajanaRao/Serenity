import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import { connect } from 'react-redux';

import { addToFavourite } from '../actions/playerState';

class Love extends PureComponent {

  render() {
    return (
      <View style={this.props.style}>
        <IconButton
          animated={true}
          icon="favorite-border"
          onPress={this.props.addToFavourite}
        />
      </View>
    );
  }
}


export default connect(
  null,
  { addToFavourite },
)(Love);
