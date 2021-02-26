import React from 'react';
import { ThemedIcon } from './ThemedIcon';

interface Props {
  repeat: string;
  updateRepeatType(): void;
}

export const RepeatIcon = ({ repeat, updateRepeatType }: Props) => {
  switch (repeat) {
    case 'repeat-all':
      return <ThemedIcon name="repeat" onPress={updateRepeatType} />;
    case 'repeat-one':
      return <ThemedIcon name="repeat-once" onPress={updateRepeatType} />;
    case 'repeat-off':
      return <ThemedIcon name="repeat-off" onPress={updateRepeatType} />;
    default:
      return null;
  }
};
