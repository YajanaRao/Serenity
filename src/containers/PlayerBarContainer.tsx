import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/core';

import {
  playTrack,
  pauseTrack,
  loadTrack,
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../actions/playerState';
import PlayerBar from '../components/PlayerBar';

function PlayerBarContainer() {
  const navigation = useNavigation();
  const active = useSelector((state: any) => state.playerState.active);
  const status = useSelector((state: any) => state.playerState.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUpTrackPlayer());
    if (!isEmpty(active)) {
      dispatch(loadTrack(active, false));
    }
    return () => {
      dispatch(destroyTrackPlayer());
    };
  }, []);

  function togglePlayback() {
    if (status === 'playing') {
      pauseTrack();
    } else {
      playTrack();
    }
  }

  const navigateToPlayer = React.useMemo(
    () => () => navigation.navigate('Player'),
    [navigation],
  );

  if (!isEmpty(active)) {
    return (
      <PlayerBar
        active={active}
        status={status}
        togglePlayback={togglePlayback}
        navigateToPlayer={navigateToPlayer}
      />
    );
  }
  return false;
}

export default PlayerBarContainer;
