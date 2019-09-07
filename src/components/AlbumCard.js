import React from 'react';
import {Paragraph} from 'react-native-paper';
import {StyleSheet,TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types'

const AlbumCard = props => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={props.onPress}>
      <FastImage source={{uri: props.artwork}} style={styles.photo} />
      <Paragraph numberOfLines={1}>{props.album}</Paragraph>
    </TouchableOpacity>
  );
};

export default AlbumCard;

AlbumCard.prototype = {
  onPress: PropTypes.func.isRequired,
  artwork: PropTypes.string.isRequired,
  album: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
  },
  photo: {
    width: 120,
    height: 120,
    // borderRadius: 12,
    elevation: 1,
  },
});
