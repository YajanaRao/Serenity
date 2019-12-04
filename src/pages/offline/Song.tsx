import React, { useRef, useState } from 'react';
import { Divider, Button, Surface, List, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

import { getOfflineSongs } from '../../actions/mediaStore';
import {
  addToQueue,
  shufflePlay,
  loadTrack,
  playNext,
  addSongToFavorite,
  addToPlaylist,
} from '../../actions/playerState';
import Blank from '../../components/Blank';
import Screen from '../../components/Screen';
import PlaylistDialog from '../../components/PlaylistDialog';
import { TrackProps } from '../../types';
import BottomSheetView from '../../components/BotttomSheetView';

interface ItemProps {
  item: TrackProps;
}

function Song() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [song, setSong] = useState();

  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.mediaStore.songs);

  const openBottomSheet = (song: TrackProps) => {
    console.log('-----open bottom sheet -------');
    setSong(song);
    setOpen(true);
  };

  function closeBottomSheet() {
    setSong({});
    setOpen(false);
  }

  function fetchData() {
    setRefreshing(true);
    dispatch(getOfflineSongs());
    setRefreshing(false);
  }

  function showDailog() {
    setOpen(false);
    setVisible(true);
  }

  function addSongToFav() {
    dispatch(addSongToFavorite(song));
    closeBottomSheet();
  }

  function addSongToPlaylist(id: string) {
    dispatch(addToPlaylist(id, song));
    setVisible(false);
  }

  function addSongToQueue() {
    dispatch(addToQueue(song));
    closeBottomSheet();
  }

  function addSongToPlayNext() {
    console.log(song);
    dispatch(playNext(song));
    closeBottomSheet();
  }

  function playSong() {
    dispatch(loadTrack(song));
    closeBottomSheet();
  }

  if (songs.length) {
    return (
      <Screen>
        <BottomSheetView
          open={open}
          loadTrack={() => dispatch(loadTrack(song))}
          playNext={() => dispatch(playNext(song))}
          addToFavorite={() => dispatch(addSongToFavorite(song))}
          addToQueue={() => dispatch(addToQueue(song))}
          addToPlaylist={showDailog}
          setClosed={closeBottomSheet}
        >
          <View style={{ flex: 1 }}>
            <TouchableWithoutFeedback
              onPress={closeBottomSheet}
              style={{ height: '100%', width: '100%' }}
            />
          </View>

          <Surface>
            <TouchableWithoutFeedback onPress={playSong}>
              <List.Item
                title="Play"
                left={props => (
                  <List.Icon {...props} icon="play-circle-outline" />
                )}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={addSongToPlayNext}>
              <List.Item
                title="Play next"
                left={props => <List.Icon {...props} icon="playlist-play" />}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={addSongToQueue}>
              <List.Item
                title="Add to queue"
                left={props => <List.Icon {...props} icon="playlist-music" />}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={addSongToFav}>
              <List.Item
                title="Add to playing queue"
                left={props => <List.Icon {...props} icon="heart" />}
              />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={showDailog}>
              <List.Item
                title="Add to Playlist"
                left={props => <List.Icon {...props} icon="playlist-plus" />}
              />
            </TouchableWithoutFeedback>
          </Surface>
        </BottomSheetView>
        <PlaylistDialog
          visible={visible}
          hideModal={() => setVisible(false)}
          addToPlaylist={addSongToPlaylist}
        />
        <FlatList
          data={songs}
          ListHeaderComponent={() => (
            <View style={styles.container}>
              <Button
                icon="play"
                mode="outlined"
                onPress={() => dispatch(addToQueue(songs))}
              >
                Play All
              </Button>
              <Button
                icon="shuffle"
                mode="outlined"
                onPress={() => dispatch(shufflePlay(songs))}
              >
                Shuffle
              </Button>
            </View>
          )}
          renderItem={({ item }: ItemProps) => (
            <List.Item
              title={item.title}
              description={item.artist || item.album}
              right={props => (
                <IconButton
                  {...props}
                  icon="dots-vertical"
                  onPress={() => {
                    openBottomSheet(item);
                  }}
                />
              )}
              onPress={() => dispatch(loadTrack(item))}
            />
          )}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        />
      </Screen>
    );
  }
  return <Blank text="No offline songs found.." fetchData={fetchData} />;
}

export default Song;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-around',
    alignItems: 'center',
    margin: 10,
    flexDirection: 'row',
  },
  panel: {
    height: '100%',
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    // elevation: 12,
    zIndex: 1000,
  },
});
