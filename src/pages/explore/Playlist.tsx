import React, { useState, useEffect } from 'react';
import { List, Portal, Dialog, TextInput, Button } from 'react-native-paper';
import { View, RefreshControl, FlatList } from 'react-native';

import {
  createPlaylist,
  getAllPlaylists,
  getFavoriteSongs,
  getPlaylistSongs,
} from '../../actions/realmAction';
import { deserializePlaylists } from '../../utils/database';
import { Screen } from '../../components/Screen';
import { PlaylistProps, NavigationScreenProps } from '../../types';
import { Collection } from 'realm';

const Playlist = ({ navigation }: { navigation: NavigationScreenProps }) => {
  const realmPlaylists = getAllPlaylists();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const [playlists, setPlaylists] = useState(() => {
    return deserializePlaylists(realmPlaylists);
  });

  useEffect(() => {
    const listner = (playlists: Collection<object>, changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const update = deserializePlaylists(playlists);
        setPlaylists(update);
      }
    };
    realmPlaylists.addListener(listner);
    return () => {
      realmPlaylists.removeListener(listner);
    };
  }, [realmPlaylists]);

  const navigateToCollection = (playlist: PlaylistProps) => {
    navigation.navigate('Songs', {
      fetchSongs: () => getPlaylistSongs(playlist.id),
      playlist,
    });
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const create = () => {
    hideDialog();
    if (name) {
      createPlaylist(name);
      setName('');
    }
  };

  const onChangeText = (text: string) => {
    setName(text);
  };

  const onRefresh = () => {
    setRefreshing(true);
    const updatePlaylists = getAllPlaylists();
    const updatedList = deserializePlaylists(updatePlaylists);
    setPlaylists(updatedList);
    setRefreshing(false);
  };

  return (
    <Screen>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Enter your playlist name</Dialog.Title>
          <Dialog.Content>
            <TextInput
              mode="outlined"
              label="Playlist Name"
              value={name}
              onChangeText={onChangeText}
            />
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Cancel</Button>
            <Button onPress={create}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FlatList
        ListHeaderComponent={() => (
          <View>
            <List.Item
              title="Create Playlist"
              left={() => <List.Icon icon="plus" />}
              onPress={showDialog}
            />
          </View>
        )}
        data={playlists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: PlaylistProps }) => (
          <List.Item
            title={item.name}
            description={`by ${item.owner}`}
            left={props => <List.Icon {...props} icon="playlist-music" />}
            onPress={() => navigateToCollection(item)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </Screen>
  );
};

export default Playlist;
