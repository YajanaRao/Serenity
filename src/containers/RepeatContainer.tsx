import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RepeatIcon } from '../components/RepeatIcon';
import { repeatSongs } from '../actions/playerState';

function RepeatContainer() {
  const repeat = useSelector((state: any) => state.config.repeat);
  const dispatch = useDispatch();

  function updateRepeatType() {
    if (repeat === 'repeat-all') {
      dispatch(repeatSongs('repeat-one'));
    } else {
      dispatch(repeatSongs('repeat-all'));
    }
  }

  return <RepeatIcon repeat={repeat} updateRepeatType={updateRepeatType} />;
}

export default RepeatContainer;
