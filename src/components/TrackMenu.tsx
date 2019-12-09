import React from 'react';
import { Menu } from 'react-native-paper';
import { View } from 'react-native';

interface MenuProps {
  visible: boolean;
  playSong(): void;
  addSongToPlayNext(): void;
  addSongToQueue(): void;
  addSongToFav(): void;
  showDialog(): void;
  contextualMenuCoord: { x: number; y: number };
  closeMenu(): void;
}

export function TrackMenu({
  visible,
  playSong,
  addSongToPlayNext,
  addSongToQueue,
  addSongToFav,
  showDialog,
  contextualMenuCoord,
  closeMenu,
}: MenuProps) {
  function play() {
    playSong();
    closeMenu();
  }

  function playNext() {
    addSongToPlayNext();
    closeMenu();
  }

  function addToQueue() {
    addSongToQueue();
    closeMenu();
  }

  function addToFav() {
    addSongToFav();
    closeMenu();
  }

  function addToPlaylist() {
    showDialog();
  }

  return (
    <View>
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={contextualMenuCoord}
      >
        <Menu.Item
          onPress={play}
          title="Play Now"
          // icon="play-circle-outline"
        />
        <Menu.Item
          onPress={playNext}
          title="Play next"
          // icon="playlist-play"
        />
        <Menu.Item
          onPress={addToQueue}
          title="Add to Queue"
          // icon="playlist-play"
        />
        <Menu.Item
          onPress={addToFav}
          title="Add to Favorites"
          // icon="heart"
        />
        <Menu.Item
          onPress={addToPlaylist}
          title="Add to Playlist"
          // icon="playlist-plus"
        />
      </Menu>
    </View>
  );
}
