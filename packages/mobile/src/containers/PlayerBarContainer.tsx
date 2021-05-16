import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/core';

import {
  play,
  pause,
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../actions/playerState';
import { PlayerBar } from '../components/PlayerBar';

export const PlayerBarContainer = () => {
  const navigation = useNavigation();
  const active = useSelector((state: any) => state.playerState.active);
  const status = useSelector((state: any) => state.playerState.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUpTrackPlayer(active));
    return () => {
      dispatch(destroyTrackPlayer());
    };
  }, []);

  // useEffect(() => {
  //   if (active !== {} && !isEmpty(active)) {
  //     dispatch(loadTrack(active, false));
  //   }
  // }, [active]);

  const togglePlayback = () => {
    if (status === 'playing') {
      pause();
    } else {
      play();
    }
  };

  const navigateToPlayer = React.useMemo(
    () => () => navigation.navigate('Player'),
    [navigation],
  );

  if (Object.keys(active).length === 0 && active.constructor === Object) {
    return null;
  }
  return (
    <PlayerBar
      active={active}
      status={status}
      togglePlayback={togglePlayback}
      navigateToPlayer={navigateToPlayer}
    />
  );
};
