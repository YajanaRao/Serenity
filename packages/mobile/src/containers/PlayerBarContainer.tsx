import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { useNavigation } from '@react-navigation/core';
import { Player, useAppDispatch, useAppSelector } from '@serenity/core';
import { PlayerBar } from '../components/PlayerBar';

export const PlayerBarContainer = () => {
  const navigation = useNavigation();
  const track = useAppSelector((state: any) => state.player.track);
  const status = useAppSelector((state: any) => state.player.status);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(Player.setUpTrackPlayer());
    return () => {
      dispatch(Player.destroyTrackPlayer());
    };
  }, []);

  const togglePlayback = () => {
    dispatch(Player.toggle())
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
