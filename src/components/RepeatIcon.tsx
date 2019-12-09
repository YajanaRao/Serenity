import React from 'react';
import { IconButton } from 'react-native-paper';

interface Props {
  repeat: string;
  updateRepeatType(): void;
}

export function RepeatIcon({ repeat, updateRepeatType }: Props) {
  if (repeat === 'repeat-all') {
    return (
      <IconButton
        icon="repeat"
        // size={20}
        onPress={updateRepeatType}
      />
    );
  }
  return (
    <IconButton
      icon="repeat-once"
      // size={20}
      onPress={updateRepeatType}
    />
  );
}
