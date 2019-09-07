import React from 'react';
import {Title} from 'react-native-paper';
import {StyleSheet, View, FlatList} from 'react-native';
import PropTypes from 'prop-types'

import ArtistCard from './ArtistCard';

const ArtistGallery = props => {
  return (
    <View>
      <Title style={styles.title}>{props.title}</Title>
      <FlatList
        horizontal={true}
        data={props.data}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => (
          <ArtistCard
            onPress={() =>
              props.navigateToSongs(item.songs, item.artwork, item.album)
            }
            songs={item.songs}
            artwork={item.artwork}
            album={item.album}
          />
        )}
      />
    </View>
  );
};

export default ArtistGallery;

ArtistGallery.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

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
  artist: {
    width: 120,
    height: 120,
    borderRadius: 60,
    elevation: 1,
  },
});
