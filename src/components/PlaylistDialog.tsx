import React from 'react';
import { List, Dialog, Portal } from 'react-native-paper';
import { FlatList } from 'react-native';
import { getUserPlaylists } from '../actions/realmAction';

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
  const data = getUserPlaylists();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          Add to Playlist
        </Dialog.Title>

        <Dialog.ScrollArea>
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: PlaylistProps }) => (
              <List.Item
                title={item.name}
                description={`by ${item.owner}`}
                left={props => <List.Icon {...props} icon="folder-open" />}
                onPress={() => addToPlaylist(item.id)}
              />
            )}
          />
          {/* </View> */}
        </Dialog.ScrollArea>
      </Dialog>
    </Portal>
  );
};
