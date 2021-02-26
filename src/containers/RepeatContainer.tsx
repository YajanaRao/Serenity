import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { View } from 'react-native';
import { RepeatIcon } from '../components/RepeatIcon';
import { repeatSongs } from '../actions/playerState';
import { RootReducerType } from '../reducers';

export const RepeatContainer = () => {
  const repeat = useSelector((state: RootReducerType) => state.config.repeat);
  const dispatch = useDispatch();

  const updateRepeatType = () => {
    if (repeat === 'repeat-all') {
      dispatch(repeatSongs('repeat-one'));
    } else if (repeat === 'repeat-one') {
      dispatch(repeatSongs('repeat-off'));
    } else {
      dispatch(repeatSongs('repeat-all'));
    }
  };

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
      <RepeatIcon repeat={repeat} updateRepeatType={updateRepeatType} />
    </View>
  );
};
