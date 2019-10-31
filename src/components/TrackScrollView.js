import React from 'react';
import { Paragraph } from 'react-native-paper';
import { StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import DefaultImage from './DefaultImage';

// FIXME: Testing the application
const TrackScrollView = ({ data, play }) => {
  return (
    <FlatList
      horizontal
      data={data}
      keyExtractor={(item, index) => index.toString()}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => (
        <TouchableOpacity style={styles.item} onPress={() => play(item)}>
          {item.artwork ? (
            <FastImage
              source={{
                uri: item.artwork,
              }}
              style={styles.photo}
            />
          ) : (
            <DefaultImage style={styles.photo} />
          )}

          <Paragraph numberOfLines={1}>{item.title}</Paragraph>
        </TouchableOpacity>
      )}
    />
  );
};

export default TrackScrollView;

TrackScrollView.propTypes = {
  play: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    elevation: 4,
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
    width: 120,
  },
});
