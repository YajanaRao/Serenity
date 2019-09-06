import React from 'react';
import {withTheme, Paragraph, Title, Surface} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';

const ArtistGallery = props => {
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={props.onPress}>
      <FastImage source={{uri: props.artwork}} style={styles.artist} />
      <Paragraph numberOfLines={1}>{props.album}</Paragraph>
    </TouchableOpacity>
  );
};

export default withTheme(ArtistGallery);

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
