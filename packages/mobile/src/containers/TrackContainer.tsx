import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';

// import { playTrack } from '../actions/player';
import { Track } from '../components/Track';
import { TrackProps } from '../utils/types';
import { RootReducerType } from '@serenity/core/src/reducers';
import { downloadMedia } from '@serenity/core/src/actions/media';
import { playSong } from '@serenity/core';

interface Props {
  track: TrackProps;
  goBack?: () => void;
}

export const TrackContainer = ({ track, goBack }: Props) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const active = useSelector(
    (state: RootReducerType) => state.player.active,
  );

  const download = () => {
    dispatch(downloadMedia(track));
  };

  useEffect(() => {
    if (!isUndefined(active) && track.id) {
      setActive(isEqual(active.id, track.id));
    }
  }, [active, track]);

  const play = () => {
    if (!isActive) {
      // requestAnimationFrame(() => {
      dispatch(playSong(track));
      // });
    }
    if (goBack) {
      goBack();
    }
  };

  return (
    <Track track={track} play={play} active={isActive} download={download} />
  );
};
