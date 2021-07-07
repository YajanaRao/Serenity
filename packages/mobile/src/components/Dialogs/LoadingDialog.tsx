import React from 'react';
import { Dialog, Portal, ActivityIndicator } from 'react-native-paper';

interface LoadingProps {
  visible: boolean;
  title: string;
}

export const LoadingDialog = ({ visible, title }: LoadingProps) => {
  return (
    <Portal>
      <Dialog visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>
          <ActivityIndicator />
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};
