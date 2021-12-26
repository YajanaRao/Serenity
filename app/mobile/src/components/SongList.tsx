import * as React from 'react';
import { Playlist, Player, SongProps, useAppDispatch } from '@serenity/core';
import { PlaylistDialog } from './Dialogs/PlaylistDialog';
import { SwipeList } from './Lists/SwipeList';
import { Container } from '@serenity/components';


interface SongListProps {
  data: SongProps[];
  title: string;
  cover: string;
  fetchData(): void;
}

export const SongList = ({
  data,
  title,
  cover,
  fetchData,
}: SongListProps) => {
  const dispatch = useAppDispatch();
  const [visible, setVisibility] = React.useState(false);
  const [song, setSong] = React.useState<SongProps>();

  function showModal(track: SongProps) {
    setVisibility(true);
    setSong(track);
  };

  function hideModal() {
    setVisibility(false);
  };

  function addPlaylist(id: string) {
    addSongsToPlaylist(id, song);
    hideModal();
  };

  function addSongsToPlaylist(id: string, song: SongProps) {
    dispatch(Playlist.addSongToPlaylist(id, song));
  };

  function addSongsToQueue(songs: SongProps[] | SongProps) {
    dispatch(Player.add(songs));
  };

  return (
    <Container>
      <PlaylistDialog
        visible={visible}
        hideModal={hideModal}
        addToPlaylist={addPlaylist}
      />
      <SwipeList
        data={data}
        title={title}
        cover={cover}
        addToQueue={addSongsToQueue}
        fetchData={fetchData}
        showModal={showModal}
      />
    </Container>
  );
};
