import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import isEqual from 'lodash/isEqual';
import isUndefined from 'lodash/isUndefined';

import { loadTrack } from '../actions/playerState';
import { Track } from '../components/Track';
import { TrackProps } from '../types';

interface Props {
  track: TrackProps;
}

export function TrackContainer({ track }: Props) {
  const [isActive, setActive] = useState(false);
  const dispatch = useDispatch();
  const active = useSelector((state: any) => state.playerState.active);

  useEffect(() => {
    if (!isUndefined(active) && track.id) {
      if (isEqual(active.id, track.id)) {
        setActive(true);
      }
    }
  }, []);

  function play() {
    if (!isActive) {
      requestAnimationFrame(() => {
        dispatch(loadTrack(track));
      });
    }
  }

  return <Track track={track} play={play} active={isActive} />;
}
