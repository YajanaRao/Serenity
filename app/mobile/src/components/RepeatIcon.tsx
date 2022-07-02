import React from 'react';
import {IconButton} from '@serenity/components';
interface Props {
  repeat: string;
  updateRepeatType(): void;
}

export const RepeatIcon = ({ repeat, updateRepeatType }: Props) => {
  let iconName = null;
  switch (repeat) {
    case 'repeat-all':
      iconName = 'repeat';
      break;
    case 'repeat-one':
      iconName = 'repeat-once';
      break;
    case 'repeat-off':
      iconName = 'repeat-off';
      break;
    default:
      iconName = 'repeat';
      break;
  }

  return <IconButton name={iconName} onPress={updateRepeatType} />;
};
