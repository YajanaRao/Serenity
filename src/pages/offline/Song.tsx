import React, { useState, useRef, useEffect } from 'react';
import { Divider, Button, List, IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  RefreshControl,
  StyleSheet,
  GestureResponderEvent,
  FlatList,
} from 'react-native';

import { useScrollToTop } from '@react-navigation/native';
import { getOfflineSongs } from '../../actions/mediaStore';
import {
  addToQueue,
  shufflePlay,
  loadTrack,
  playNext,
  addSongToFavorite,
  addToPlaylist,
} from '../../actions/playerState';
import { Blank } from '../../components/Blank';
import { Screen } from '../../components/Screen';
import { PlaylistDialog } from '../../components/PlaylistDialog';
import { TrackProps } from '../../types';
import { TrackMenu } from '../../components/TrackMenu';
import { RootReducerType } from '../../reducers';

interface ItemProps {
  item: TrackProps;
}

export const SongScreen = () => {
  const ref = useRef();
  useScrollToTop(ref);
  const [visible, setVisible] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [song, setSong] = useState();
  const [cord, setCord] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();

  const songs = useSelector((state: RootReducerType) => state.mediaStore.songs);

  useEffect(() => {
    dispatch(getOfflineSongs());
  }, [dispatch]);

  const fetchData = () => {
    setRefreshing(true);
    dispatch(getOfflineSongs());
    setRefreshing(false);
  };

  const showDialog = () => {
    setVisible('DIALOG');
  };

  const addSongToFav = () => {
    dispatch(addSongToFavorite(song));
  };

  const addSongToPlaylist = (id: string) => {
    dispatch(addToPlaylist(id, song));
    setVisible('');
  };

  const addSongToQueue = () => {
    dispatch(addToQueue(song));
  };

  const addSongToPlayNext = () => {
    dispatch(playNext(song));
  };

  const playSong = () => {
    dispatch(loadTrack(song));
  };

  const play = (song: TrackProps) => {
    dispatch(loadTrack(song));
  };

  const openMenu = (event: GestureResponderEvent, song: TrackProps) => {
    const { nativeEvent } = event;
    const contextualMenuCoord = {
      x: nativeEvent.pageX,
      y: nativeEvent.pageY,
    };
    setCord(contextualMenuCoord);
    setVisible('MENU');
    setSong(song);
  };

  const closeMenu = () => {
    setVisible('');
  };

  if (songs.length) {
    return (
      <Screen>
        <PlaylistDialog
          visible={visible === 'DIALOG'}
          hideModal={() => setVisible('')}
          addToPlaylist={addSongToPlaylist}
        />
        <TrackMenu
          visible={visible === 'MENU'}
          playSong={playSong}
          addSongToFav={addSongToFav}
          addSongToPlayNext={addSongToPlayNext}
          addSongToQueue={addSongToQueue}
          showDialog={showDialog}
          closeMenu={closeMenu}
          contextualMenuCoord={cord}
        />
        <FlatList
          ref={ref}
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
                  icon="ellipsis-vertical-outline"
                  onPress={(event: GestureResponderEvent) =>
                    openMenu(event, item)
                  }
                />
              )}
              onPress={() => play(item)}
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
};

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
