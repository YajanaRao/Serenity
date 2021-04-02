import React from 'react';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

interface AlertProps {
  visible: boolean;
  title: string;
  message: string;
  action(): void;
  hideDialog(): void;
}

export const AlertDialog = ({
  visible,
  title,
  message,
  action,
  hideDialog,
}: AlertProps) => {
  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title style={{ fontFamily: 'Nunito-Bold' }}>
          {title}
        </Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={hideDialog} mode="outlined" style={{ width: 100 }}>
            Cancel
          </Button>
          <Button
            onPress={action}
            mode="contained"
            style={{ width: 100, marginLeft: 12 }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
