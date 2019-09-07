import React from 'react';
import {Paragraph} from 'react-native-paper';
import {StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types'

const ArtistCard = props => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={props.onPress}>
      <FastImage source={{uri: props.artwork}} style={styles.artist} />
      <Paragraph numberOfLines={1}>{props.album}</Paragraph>
    </TouchableOpacity>
  );
};

export default ArtistCard;

ArtistCard.prototype = {
  onPress: PropTypes.func.isRequired,
  artwork: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
  },
  artist: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 1,
  },
});
