import React from 'react';
import {withTheme, Paragraph, Title, Surface} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import ArtistCard from './ArtistCard';

const ArtistGallery = props => {
  return (
    <View>
      <Title style={styles.title}>{props.title}</Title>
      {props.data ? (
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
      ) : (
        <Surface
          style={{
            height: 120,
            marginLeft: 12,
            marginBottom: 4,
          }}
        />
      )}
    </View>
  );
};

export default withTheme(ArtistGallery);

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
