import React from 'react';
import { useDispatch } from 'react-redux';
import { View } from 'react-native';
import { RepeatIcon } from '../components/RepeatIcon';
import { Player, useAppSelector } from '@serenity/core';

export const RepeatContainer = () => {
  const { repeat } = useAppSelector((state) => state.player);
  const dispatch = useDispatch();

  const updateRepeatType = () => {
    if (repeat === 'repeat-all') {
      dispatch(Player.repeatSongs('repeat-one'));
    } else if (repeat === 'repeat-one') {
      dispatch(Player.repeatSongs('repeat-off'));
    } else {
      dispatch(Player.repeatSongs('repeat-all'));
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <RepeatIcon repeat={repeat} updateRepeatType={updateRepeatType} />
    </View>
  );
};
