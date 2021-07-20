import React from 'react';
import { useDispatch } from 'react-redux';
import { addSongToPlaylist, addSongToQueue } from '@serenity/core';
import { SongList } from '../components/Lists/SongList';
import { TrackProps } from '../utils/types';

interface SongListContainerProps {
  data: TrackProps[];
  title: string;
  cover: string;
  fetchData(): void;
}

export const SongListContainer = ({
  data,
  title,
  cover,
  fetchData,
}: SongListContainerProps) => {
  const dispatch = useDispatch();

  const addSongsToPlaylist = (id: string, song: TrackProps) => {
    dispatch(addSongToPlaylist(id, song));
  };

  const addSongsToQueue = (songs: TrackProps[] | TrackProps) => {
    dispatch(addSongToQueue(songs));
  };
  return (
    <SongList
      data={data}
      title={title}
      cover={cover}
      fetchData={fetchData}
      addToPlaylist={addSongsToPlaylist}
      addToQueue={addSongsToQueue}
    />
  );
};
