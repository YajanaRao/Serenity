import React, { useState } from 'react';

import { PlaylistDialog } from './PlaylistDialog';
import { SwipeList } from './SwipeList';
import { Container } from 'components';

import { TrackProps } from '../utils/types';

interface SongListProps {
  data: TrackProps[];
  title: string;
  cover: string;
  addToQueue(songs: TrackProps | TrackProps[]): void;
  addToPlaylist(id: string, track: TrackProps): void;
  fetchData(): void;
}

export const SongList = ({
  data,
  title,
  cover,
  addToQueue,
  addToPlaylist,
  fetchData,
}: SongListProps) => {
  const [visible, setVisibility] = useState(false);
  const [song, setSong] = useState();

  const showModal = (track: TrackProps) => {
    setVisibility(true);
    setSong(track);
  };

  const hideModal = () => {
    setVisibility(false);
  };

  const addSongToPlaylist = (id: string) => {
    addToPlaylist(id, song);
    hideModal();
  };

  return (
    <Container>
      <PlaylistDialog
        visible={visible}
        hideModal={hideModal}
        addToPlaylist={addSongToPlaylist}
      />
      <SwipeList
        data={data}
        title={title}
        cover={cover}
        addToQueue={addToQueue}
        fetchData={fetchData}
        showModal={showModal}
      />
    </Container>
  );
};
