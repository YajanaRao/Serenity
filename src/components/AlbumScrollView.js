import React from 'react';
import {Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';
import PropTypes from 'prop-types';

const AlbumScrollView = props => {
  return (
    <View>
      <Title style={styles.title}>{props.title}</Title>
      <FlatList
        horizontal={true}
        data={props.data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() =>
              props.navigateToSongs(item.songs, item.artwork, item.album)
            }>
            <FastImage source={{uri: item.artwork}} style={styles.photo} />
            <Paragraph numberOfLines={1}>{item.album}</Paragraph>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

AlbumScrollView.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default AlbumScrollView;

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
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
