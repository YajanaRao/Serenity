import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { RepeatIcon } from '../components/RepeatIcon';
import { Player } from '@serenity/core';

export const RepeatContainer = () => {
  const repeat = useSelector((state) => state.config.repeat);
  const dispatch = useDispatch();

  const updateRepeatType = () => {
    if (repeat === 'repeat-all') {
      dispatch(Player.repeat('repeat-one'));
    } else if (repeat === 'repeat-one') {
      dispatch(Player.repeat('repeat-off'));
    } else {
      dispatch(Player.repeat('repeat-all'));
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <RepeatIcon repeat={repeat} updateRepeatType={updateRepeatType} />
    </View>
  );
};
