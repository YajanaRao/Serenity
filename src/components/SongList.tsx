import PropTypes from 'prop-types';
import React, { useState, SetStateAction } from 'react';
import { Portal, Dialog, Title } from 'react-native-paper';
import { View, ScrollView } from 'react-native';
import isEmpty from 'lodash/isEmpty';

import PlaylistComponent from './PlaylistComponent';
import SwipeList from './SwipeList';
import EmptyPlaylist from './EmptyPlaylist';
import Container from './Container';

interface TrackProps {
  artwork: string;
  title: string;
  artist: string;
}

interface SongListProps {
  data: TrackProps[];
  title: string;
  cover: string;
  addToQueue(): void;
  addToPlaylist(id: string, track: TrackProps): void;
  fetchData(): void;
}

function SongList({
  data,
  title,
  cover,
  addToQueue,
  addToPlaylist,
  fetchData,
}: SongListProps) {
  const [visible, setVisibility] = useState(false);
  const [song, setSong] = useState(null);

  function showModal(track: SetStateAction<null>) {
    setVisibility(true);
    setSong(track);
  }

  function hideModal() {
    setVisibility(false);
    setSong(null);
  }

  function addSongToPlaylist(id: string, track: TrackProps) {
    addToPlaylist(id, track);
    hideModal();
  }

  return (
    <Container>
      {isEmpty(data) ? (
        <EmptyPlaylist />
      ) : (
        <View>
          <Portal>
            <Dialog visible={visible} onDismiss={hideModal}>
              <Dialog.ScrollArea>
                <ScrollView
                  contentContainerStyle={{
                    marginHorizontal: 16,
                    marginVertical: 16,
                  }}
                >
                  <Title style={{ textAlign: 'center' }}>Add to Playlist</Title>
                  <PlaylistComponent
                    song={song}
                    addToPlaylist={addSongToPlaylist}
                  />
                </ScrollView>
              </Dialog.ScrollArea>
            </Dialog>
          </Portal>
          <SwipeList
            data={data}
            title={title}
            cover={cover}
            addToQueue={addToQueue}
            fetchData={fetchData}
            showModal={showModal}
          />
        </View>
      )}
    </Container>
  );
}

export default SongList;
