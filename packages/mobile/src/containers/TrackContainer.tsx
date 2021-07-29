import React, { useEffect, useState } from 'react';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';
import { Track } from '../components/Track';
import { downloadMedia, SongProps, useAppDispatch, useAppSelector } from '@serenity/core';
import { playSong } from '@serenity/core';

interface Props {
  track: SongProps;
  goBack?: () => void;
}

export const TrackContainer = ({ track, goBack }: Props) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useAppDispatch();
  const active = useAppSelector(
    (state) => state.player.active,
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
      dispatch(playSong(track));
    }
    if (goBack) {
      goBack();
    }
  };

  return (
    <Track track={track} play={play} active={isActive} download={download} />
  );
};
