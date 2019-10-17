import React from 'react';
import { Title, Paragraph } from 'react-native-paper';
import { StyleSheet, FlatList, TouchableOpacity, View } from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

import DefaultImage from './DefaultImage';

// FIXME: Testing the application
const TrackScrollView = ({ title, data, play }) => {
  return (
    <View>
      <Title style={styles.title}>{title}</Title>
      <FlatList
        horizontal
        data={data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) =>
          item ? (
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
          ) : (
            false
          )
        }
      />
    </View>
  );
};

export default TrackScrollView;

TrackScrollView.propTypes = {
  title: PropTypes.string.isRequired,
  play: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    borderRadius: 12,
    elevation: 4,
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
    width: 120,
  },
});
