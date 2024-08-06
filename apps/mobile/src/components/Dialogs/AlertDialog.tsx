import React from 'react';
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import { Button } from '@serenity/components';
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
          <Button onPress={hideDialog} style={{ width: 100 }}>
            Cancel
          </Button>
          <Button
            onPress={action}
            color="red"
            style={{ width: 100, marginLeft: 12 }}
          >
            Ok
          </Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
