import React, { useState } from 'react';
import {
  List,
  Portal,
  Dialog,
  TextInput,
  useTheme,
} from 'react-native-paper';
import { View } from 'react-native';
import { Button, Screen } from '@serenity/components';
import { addPlaylist, selectPlaylistIds } from '@serenity/core';
import { useDispatch, useSelector } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import { Playlist } from './components/Playlist';

export const PlaylistScreen = () => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const playlists = useSelector(state => selectPlaylistIds(state));
  const dispatch = useDispatch();


  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const create = () => {
    hideDialog();
    if (name) {
      dispatch(addPlaylist(name));
      setName('');
    }
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
              // value={name}
              onChangeText={setName}
            />
          </Dialog.Content>
          <Dialog.Actions style={{justifyContent: "space-around"}}>
            <Button onPress={hideDialog} color={colors.error}>Cancel</Button>
            <Button onPress={create}>Create</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
      <FlatList
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
        data={playlists}
        keyExtractor={(item) => item}
        renderItem={({ item }: { item: string }) => <Playlist id={item} />}
      />
    </Screen>
  );
};

