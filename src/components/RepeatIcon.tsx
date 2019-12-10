import React from 'react';
import { IconButton } from 'react-native-paper';

interface Props {
  repeat: string;
  updateRepeatType(): void;
}

export const RepeatIcon = ({ repeat, updateRepeatType }: Props) => {
  if (repeat === 'repeat-all') {
    return <IconButton icon="repeat" onPress={updateRepeatType} />;
  }
  return <IconButton icon="repeat-once" onPress={updateRepeatType} />;
};
