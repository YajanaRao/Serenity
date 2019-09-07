import React from 'react';
import {Title} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types'

import AlbumCard from './AlbumCard';

const AlbumGallery = props => {
  return (
    <View>
      <Title style={styles.title}>{props.title}</Title>
      <FlatList
        horizontal={true}
        data={props.data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <AlbumCard
            songs={item.songs}
            artwork={item.artwork}
            album={item.album}
            onPress={() =>
              props.navigateToSongs(item.songs, item.artwork, item.album)
            }
          />
        )}
      />
    </View>
  );
};

AlbumGallery.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
}

export default AlbumGallery;

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
  }
});
