import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';

import { playTrack } from '../actions/playerState';
import { Track } from '../components/Track';
import { TrackProps } from '../utils/types';
import { RootReducerType } from '../reducers';
import { downloadMedia } from '../actions/mediaStore';

interface Props {
  track: TrackProps;
  goBack?: () => void;
}

export const TrackContainer = ({ track, goBack }: Props) => {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const active = useSelector(
    (state: RootReducerType) => state.playerState.active,
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
      dispatch(playTrack(track));
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
