import React from 'react';
import {withTheme, Paragraph, Title, Surface} from 'react-native-paper';
import {StyleSheet, View, TouchableOpacity, FlatList} from 'react-native';
import FastImage from 'react-native-fast-image';
import AlbumCard from './AlbumCard';

const AlbumGallery = props => {
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
            <AlbumCard
              songs={item.songs}
              artwork={item.artwork}
              album={item.album}
              onPress={() => props.navigateToSongs(item.songs, item.artwork, item.album)}
            />
          )}
        />
      ) : (
        <Surface style={styles.container} />
      )}
    </View>
  );
};

export default withTheme(AlbumGallery);

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
  container: {
    height: 120,
    marginLeft: 12,
    marginBottom: 12,
    elevation: 1,
  },
});
