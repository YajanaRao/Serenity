import React from 'react';
import Config from 'react-native-config';
import { Dialog, Portal, Button, List } from 'react-native-paper';

export interface DiagnoseDialogProps {
  visible: boolean;
  hideDialog: () => void;
}

export function DiagnoseDialog({ visible, hideDialog }: DiagnoseDialogProps) {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Diagnose</Dialog.Title>
        <Dialog.Content>
          <List.Item
            title="Youtube health check"
            right={() => (
              <List.Icon
                icon={Config.YOUTUBE_API_KEY ? 'checkmark' : 'close'}
              />
            )}
            style={{ margin: 0, padding: 0, height: 40 }}
          />
          <List.Item
            title="Webhook health check"
            right={() => (
              <List.Icon icon={Config.WEBHOOK_URL ? 'checkmark' : 'close'} />
            )}
            style={{ margin: 0, padding: 0, height: 40 }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            mode="outlined"
            style={{ width: 100, marginRight: 12 }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
