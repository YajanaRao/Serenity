import React from 'react';
import { View } from 'react-native';
import { IconButton } from 'react-native-paper';
import PropTypes from 'prop-types';

const Fav = ({ style, liked, addToFavorite, removeFromFavorite }) => (
  <View style={style}>
    {liked ? (
      <IconButton animated icon="heart" onPress={removeFromFavorite} />
    ) : (
      <IconButton animated icon="heart-outline" onPress={addToFavorite} />
    )}
  </View>
);

Fav.propTypes = {
  style: PropTypes.object,
  liked: PropTypes.bool,
  addToFavorite: PropTypes.func,
  removeFromFavorite: PropTypes.func,
};

Fav.defaultProps = {
  style: {},
  liked: false,
};

export default Fav;
