import React from 'react';
import { IconButton } from 'react-native-paper';
import { useDispatch } from 'react-redux';

import { addToQueue } from '../actions/playerState';
import { findAlbumSongs, findArtistSongs } from '../actions/mediaStore';
import { TrackProps } from '../utils/types';

interface Props {
  type: 'album' | 'artist';
  title: string;
}

export const AddToQueueIcon = ({ type, title }: Props) => {
  const dispatch = useDispatch();

  const addSongsToQueue = () => {
    if (type === 'album') {
      findAlbumSongs(title).then((tracks: TrackProps) => {
        dispatch(addToQueue(tracks));
      });
    } else if (type === 'artist') {
      findArtistSongs(title).then(tracks => {
        dispatch(addToQueue(tracks));
      });
    }
  };

  return <IconButton icon="play-circle-outline" onPress={addSongsToQueue} />;
};
