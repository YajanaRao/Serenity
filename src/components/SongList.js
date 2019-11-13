import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Portal, Dialog, Title } from 'react-native-paper';
import { View, ScrollView } from 'react-native';

import PlaylistComponent from './PlaylistComponent';
import SwipeList from './SwipeList';

function SongList({
  data,
  title,
  cover,
  addToQueue,
  addToPlaylist,
  fetchData,
}) {
  const [visible, setVisibility] = useState(false);
  const [song, setSong] = useState(null);

  function showModal(track) {
    setVisibility(true);
    setSong(track);
  }

  function hideModal() {
    setVisibility(false);
    setSong(null);
  }

  function addSongToPlaylist(id, track) {
    addToPlaylist(id, track);
    hideModal();
  }

  return (
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
  );
}

SongList.propTypes = {
  data: PropTypes.array,
};

export default SongList;
