import React, { useState } from 'react';
import { Dialog, Portal, Button, TextInput } from 'react-native-paper';

interface Props {
  visible: boolean;
  hideDialog(): void;
  playlistName: string;
  rename(name: string): void;
}

export function RenamePlaylistDailog({
  visible,
  hideDialog,
  playlistName,
  rename,
}: Props) {
  const [name, setName] = useState(playlistName);
  function onChangeText(playlistName: string) {
    setName(playlistName);
  }

  function submit() {
    hideDialog();
    rename(name);
  }
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Renaming</Dialog.Title>
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
          <Button onPress={submit}>Rename</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
