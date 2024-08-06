import * as React from 'react';
import { Dialog, Portal, ActivityIndicator } from 'react-native-paper';

interface SpinnerDialogProps {
  visible: boolean;
  title: string;
}

export const SpinnerDialog = ({ visible, title }: SpinnerDialogProps) => (
  <Portal>
    <Dialog visible={visible}>
      <Dialog.Title>{title}</Dialog.Title>
      <Dialog.Content>
        <ActivityIndicator />
      </Dialog.Content>
    </Dialog>
  </Portal>
);
