import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RepeatIcon } from '../components/RepeatIcon';
import { repeatSongs } from '../actions/playerState';
import { RootReducerType } from '../reducers';

export const RepeatContainer = () => {
  const repeat = useSelector((state: RootReducerType) => state.config.repeat);
  const dispatch = useDispatch();

  const updateRepeatType = () => {
    if (repeat === 'repeat-all') {
      dispatch(repeatSongs('repeat-one'));
    } else {
      dispatch(repeatSongs('repeat-all'));
    }
  };

  return <RepeatIcon repeat={repeat} updateRepeatType={updateRepeatType} />;
};
