import React from 'react';
import { List } from 'react-native-paper';
import { FlatList } from 'react-native';
import { getUserPlaylists } from '../actions/realmAction';

const PlaylistComponent = ({ song, addToPlaylist }) => {
  const data = getUserPlaylists();
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({ item }) => (
        <List.Item
          title={item.name}
          description={`by ${item.owner}`}
          left={props => <List.Icon {...props} icon="playlist-music" />}
          onPress={() => addToPlaylist(item.id, song)}
        />
      )}
    />
  );
};

export default PlaylistComponent;
