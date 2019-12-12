import React, { useState } from 'react';
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
          <Button onPress={action}>Ok</Button>
          <Button onPress={hideDialog}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
