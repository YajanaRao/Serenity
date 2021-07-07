import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/core';

import {
  destroyTrackPlayer,
  setUpTrackPlayer,
} from '../../../core/src/actions/player';
import { PlayerBar } from '../components/PlayerBar';
import { toggle } from '@serenity/core';

export const PlayerBarContainer = () => {
  const navigation = useNavigation();
  const track = useSelector((state: any) => state.player.track);
  const status = useSelector((state: any) => state.player.status);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setUpTrackPlayer());
    return () => {
      dispatch(destroyTrackPlayer());
    };
  }, []);

  const togglePlayback = () => {
    dispatch(toggle())
  };

  const navigateToPlayer = React.useMemo(
    () => () => navigation.navigate('Player'),
    [navigation],
  );

  if (isEmpty(track)) {
    return null;
  }
  return (
    <PlayerBar
      active={track}
      status={status}
      togglePlayback={togglePlayback}
      navigateToPlayer={navigateToPlayer}
    />
  );
};
