import React from 'react';
import { List, Dialog, Portal, Button } from 'react-native-paper';
import { FlatList } from 'react-native';
import { useAppSelector } from '@serenity/core';

interface Props {
  visible: boolean;
  hideModal(): void;
  addToPlaylist(id: string): void;
}

interface PlaylistProps {
  id: string;
  name: string;
  owner: string;
}

export const PlaylistDialog = ({
  visible,
  hideModal,
  addToPlaylist,
}: Props) => {
  const playlists = useAppSelector(state => state.playlists);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          {playlists && playlists.length ? 'Add to Playlist' : 'No playlists found'}
        </Dialog.Title>

        <Dialog.ScrollArea>
          <FlatList
            data={playlists}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: PlaylistProps }) => (
              <List.Item
                title={item.name}
                description={`by ${item.owner}`}
                left={props => <List.Icon {...props} icon="folder-outline" />}
                onPress={() => addToPlaylist(item.id)}
              />
            )}
          />
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button mode="contained" onPress={() => hideModal()}>
            Close
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
