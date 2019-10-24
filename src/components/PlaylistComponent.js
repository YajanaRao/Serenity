import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { StyleSheet, FlatList } from 'react-native';
import { getAllPlaylists } from '../actions/realmAction';

const PlaylistComponent = props => {
  return (
    <FlatList
      data={getAllPlaylists()}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={`by ${item.owner}`}
          left={props => <List.Icon {...props} icon="playlist-music" />}
          onPress={() => props.addToPlaylist(item.id, props.song)}
        />
      )}
    />
  );
};

export default PlaylistComponent;
