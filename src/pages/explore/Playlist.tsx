import React, { useState, useEffect } from 'react';
import {
  List,
  Portal,
  Dialog,
  TextInput,
  Button,
  useTheme,
} from 'react-native-paper';
import { RefreshControl, SectionList, StyleSheet, View } from 'react-native';

import { Collection } from 'realm';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
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
import { log } from '../../utils/logging';
import realm from '../../database';

export const PlaylistScreen = ({ navigation }: StackScreenProps) => {
  const { skipLoginState } = useSelector(state => state.user);
  const { colors } = useTheme();
  let realmPlaylists = getAllPlaylists();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');
  const youtubePlaylists = useCache('youtube_playlists', () =>
    skipLoginState ? [] : getYoutubePlaylist(),
  );

  const [localPlaylists, setLocalPlaylists] = useState(() => {
    return deserializePlaylists(realmPlaylists);
  });
  const [playlists, setPlaylists] = useState([]);

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
    setLocalPlaylists(updatedList);
    setRefreshing(false);
  };

  useEffect(() => {
    const listner = (playlists: Collection<object>, changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const update = deserializePlaylists(playlists);
        setLocalPlaylists(update);
      }
    };

    if (realmPlaylists !== undefined && !realm.isInTransaction) {
      realmPlaylists.addListener(listner);
      return () => realmPlaylists.removeListener(listner);
    }
  }, [realmPlaylists]);

  useEffect(() => {
    const playlists = [];
    playlists.push({ title: 'Local Playlists', data: localPlaylists });
    if (!skipLoginState && youtubePlaylists && youtubePlaylists.length) {
      log.debug('logged in adding youtube playlists');
      playlists.push({
        title: 'Youtube Playlists',
        data: youtubePlaylists,
      });
    }
    setPlaylists(playlists);
  }, [localPlaylists, youtubePlaylists]);

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
              <List.Icon {...props} icon="plus" color={colors.primary} />
            )}
            onPress={showDialog}
          />
        )}
        ListFooterComponent={() => <View style={{ height: 100 }} />}
        sections={playlists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: PlaylistProps }) => (
          <List.Item
            title={item.name}
            description={`by ${item.owner}`}
            left={props =>
              item.cover ? (
                <FastImage
                  source={{ uri: item.cover }}
                  style={styles.artwork}
                />
              ) : (
                <List.Icon {...props} icon="folder" />
              )
            }
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

const styles = StyleSheet.create({
  artwork: {
    backgroundColor: '#d7d1c9',
    borderRadius: 4,
    height: 50,
    width: 50,
  },
});
