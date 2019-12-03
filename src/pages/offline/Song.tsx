import React, { useRef, useState } from 'react';
import {
  Divider,
  Button,
  Portal,
  Surface,
  List,
  IconButton,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { View, RefreshControl, StyleSheet } from 'react-native';
import { FlatList } from 'react-navigation';
import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';
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

interface ItemProps {
  item: TrackProps;
}

function Song() {
  const bs = useRef();
  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [song, setSong] = useState();
  const sheetOpenValue = new Animated.Value(1);
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.mediaStore.songs);

  const openBottomSheet = (song: TrackProps) => {
    bs.current.snapTo(0);
    // setSong(song);
  };

  function fetchData() {
    setRefreshing(true);
    dispatch(getOfflineSongs());
    setRefreshing(false);
  }

  function closeBottomSheet() {
    setSong({});
    bs.current.snapTo(1);
  }

  function showDailog() {
    bs.current.snapTo(1);
    setVisible(true);
  }

  function addSongToPlaylist(id: string) {
    dispatch(addToPlaylist(id, song));
    setVisible(false);
  }

  function renderInner() {
    return (
      <View style={styles.panel}>
        <View style={{ flex: 1 }}>
          <TouchableWithoutFeedback
            onPress={closeBottomSheet}
            style={{ height: '100%', width: '100%' }}
          />
        </View>

        <Surface>
          <TouchableWithoutFeedback
            onPress={() => {
              loadTrack(song);
              closeBottomSheet();
            }}
          >
            <List.Item
              title="Play"
              left={props => (
                <List.Icon {...props} icon="play-circle-outline" />
              )}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              playNext(song);
              closeBottomSheet();
            }}
          >
            <List.Item
              title="Play next"
              left={props => <List.Icon {...props} icon="playlist-play" />}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              addToQueue(song);
              closeBottomSheet();
            }}
          >
            <List.Item
              title="Add to queue"
              left={props => <List.Icon {...props} icon="playlist-music" />}
            />
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => {
              addSongToFavorite(song);
              closeBottomSheet();
            }}
          >
            <List.Item
              title="Add to Favorite"
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
      </View>
    );
  }

  if (songs.length) {
    return (
      <Screen>
        <Portal>
          <Animated.View
            style={[
              {
                flex: 1,
                backgroundColor: 'rgba(0,0,0, .7)',
                ...StyleSheet.absoluteFillObject,
              },
              {
                opacity: Animated.cond(
                  Animated.greaterOrEq(sheetOpenValue, 0.95),
                  0,
                  1,
                ),
              },
            ]}
            pointerEvents="none"
          />
          <BottomSheet
            ref={bs}
            snapPoints={['100%', 0]}
            renderContent={renderInner}
            initialSnap={1}
            callbackNode={sheetOpenValue}
          />
        </Portal>
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
