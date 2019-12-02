import React from 'react';
import { List, Dialog, Portal, Title } from 'react-native-paper';
import { FlatList, View } from 'react-native';
import { getUserPlaylists } from '../actions/realmAction';

interface Props {
  visible: boolean;
  hideModal(): void;
  addToPlaylist(id: string): void;
}

const PlaylistDailog = ({ visible, hideModal, addToPlaylist }: Props) => {
  const data = getUserPlaylists();
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideModal}>
        <Dialog.Title style={{ textAlign: 'center' }}>
          Add to Playlist
        </Dialog.Title>

        <Dialog.ScrollArea>
          {/* <View
            style={{
              marginHorizontal: 16,
              paddingVertical: 16
            }}
          > */}
          <FlatList
            data={data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={`by ${item.owner}`}
                left={props => <List.Icon {...props} icon="playlist-music" />}
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

export default PlaylistDailog;
