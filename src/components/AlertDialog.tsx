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
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph>{message}</Paragraph>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={action} mode="outlined" style={{ width: 100 }}>
            Ok
          </Button>
          <Button onPress={hideDialog} mode="contained">
            Cancel
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
