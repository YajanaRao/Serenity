import React, { useState, useEffect } from 'react';
import {
  List,
  Portal,
  Dialog,
  TextInput,
  Button,
  useTheme,
} from 'react-native-paper';
import { RefreshControl, SectionList } from 'react-native';

import { Collection } from 'realm';
import { StackScreenProps } from '@react-navigation/stack';
import {
  createPlaylist,
  getAllPlaylists,
  getPlaylistSongs,
} from '../../actions/realmAction';
import { deserializePlaylists } from '../../utils/database';
import { Screen } from '../../components/Screen';
import { PlaylistProps } from '../../types';
import { getYoutubePlaylist } from '../../services/Youtube';
import { useCache } from '../../hooks/useCache';

export const PlaylistScreen = ({ navigation }: StackScreenProps) => {
  const { colors } = useTheme();
  const realmPlaylists = getAllPlaylists();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const youtubePlaylists = useCache('youtube_playlists', () =>
    getYoutubePlaylist(),
  );
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
    if (playlist.type === 'Youtube') {
      navigation.navigate('Songs', {
        songs: playlist.songs,
        playlist,
      });
    } else {
      navigation.navigate('Songs', {
        songs: getPlaylistSongs(playlist.id),
        playlist,
      });
    }
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
    realmPlaylists = getAllPlaylists();
    const updatedList = deserializePlaylists(realmPlaylists);
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
      <SectionList
        ListHeaderComponent={() => (
          <List.Item
            title="Create Playlist"
            titleStyle={{ color: colors.primary }}
            left={props => (
              <List.Icon {...props} icon="add" color={colors.primary} />
            )}
            onPress={showDialog}
          />
        )}
        sections={[
          { title: 'Local Playlists', data: playlists },
          { title: 'Youtube Playlists', data: youtubePlaylists },
        ]}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: PlaylistProps }) => (
          <List.Item
            title={item.name}
            description={`by ${item.owner}`}
            left={props => <List.Icon {...props} icon="folder-open" />}
            onPress={() => navigateToCollection(item)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        renderSectionHeader={({ section: { title } }) => (
          <List.Subheader>{title}</List.Subheader>
        )}
      />
    </Screen>
  );
};
