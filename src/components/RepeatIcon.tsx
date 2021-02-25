import React from 'react';
import { IconButton } from 'react-native-paper';

interface Props {
  repeat: string;
  updateRepeatType(): void;
}

export const RepeatIcon = ({ repeat, updateRepeatType }: Props) => {
  switch (repeat) {
    case 'repeat-all':
      return <IconButton icon="repeat" onPress={updateRepeatType} />;
    case 'repeat-one':
      return <IconButton icon="repeat-once" onPress={updateRepeatType} />;
    case 'repeat-off':
      return <IconButton icon="repeat-off" onPress={updateRepeatType} />;
    default:
      return null;
  }
};
