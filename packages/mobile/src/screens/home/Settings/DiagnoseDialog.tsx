import React from 'react';
import { Dialog, Portal, List } from 'react-native-paper';
import { Button } from '@serenity/components';

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
            title="Dev Env health check"
            right={() => <List.Icon icon={__DEV__ ? 'checkmark' : 'close'} />}
            style={{ margin: 0, padding: 0, height: 40 }}
          />
        </Dialog.Content>
        <Dialog.Actions>
          <Button
            onPress={hideDialog}
            style={{ width: 100, marginRight: 12 }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
