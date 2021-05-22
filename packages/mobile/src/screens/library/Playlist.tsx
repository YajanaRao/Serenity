import React, { useState, useEffect } from 'react';
import {
  List,
  Portal,
  Dialog,
  TextInput,
  Button,
  useTheme,
  Chip,
} from 'react-native-paper';
import { RefreshControl, SectionList, StyleSheet, View } from 'react-native';

import { Collection } from 'realm';
import { StackScreenProps } from '@react-navigation/stack';
import FastImage from 'react-native-fast-image';
import { createPlaylist, getAllPlaylists } from '../../actions/realmAction';
import { deserializePlaylists } from '../../utils/database';
import { Screen } from 'components';
import { PlaylistProps } from '../../utils/types';
import realm from '../../database';
import { Title } from 'components';

export const PlaylistScreen = ({ navigation }: StackScreenProps) => {
  const { colors } = useTheme();
  let realmPlaylists = getAllPlaylists();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [name, setName] = useState('');


  const [localPlaylists, setLocalPlaylists] = useState(() => {
    return deserializePlaylists(realmPlaylists);
  });
  const [playlists, setPlaylists] = useState([]);

  const navigateToCollection = (playlist: PlaylistProps) => {
    delete playlist.songs;
    navigation.navigate('PlaylistSongs', {
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
    setPlaylists(playlists);
  }, [localPlaylists]);



  function refreshPlaylist(title: string) {
    if (title === 'Local Playlists') {
      setRefreshing(true);
      realmPlaylists = getAllPlaylists();
      const updatedList = deserializePlaylists(realmPlaylists);
      setLocalPlaylists(updatedList);
      setRefreshing(false);
    }
  }

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
            titleStyle={{ color: colors.primary, fontFamily: 'Nunito-Bold' }}
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
                  style={[styles.artwork, { backgroundColor: colors.surface }]}
                  resizeMode="cover"
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
          <View style={styles.sectionHeader}>
            <Title>{title}</Title>
            <Chip
              icon="refresh-outline"
              disabled={refreshing}
              onPress={() => refreshPlaylist(title)}
            >
              Refresh
            </Chip>
          </View>
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 8,
  },
  artwork: {
    backgroundColor: '#d7d1c9',
    borderRadius: 4,
    height: 50,
    width: 50,
  },
});
