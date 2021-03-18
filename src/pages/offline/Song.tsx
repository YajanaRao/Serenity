import React, { useState, useRef, useEffect } from 'react';
import {
  Divider,
  Button,
  List,
  IconButton,
  useTheme,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import {
  View,
  RefreshControl,
  StyleSheet,
  GestureResponderEvent,
  Animated,
} from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';

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
  const ref = useRef(null);
  useScrollToTop(ref);
  const [visible, setVisible] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [song, setSong] = useState();
  const [cord, setCord] = useState({ x: 0, y: 0 });
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const songs = useSelector((state: RootReducerType) => state.mediaStore.songs);

  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    translateY,
  } = useCollapsibleSubHeader();

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

        <Animated.FlatList
          onScroll={onScroll}
          contentContainerStyle={{ paddingTop: containerPaddingTop }}
          scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
          ref={ref}
          data={songs}
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
          // ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
        />

        <CollapsibleSubHeaderAnimator translateY={translateY}>
          <View style={[styles.header, { backgroundColor: colors.background }]}>
            <Button
              icon="play"
              mode="outlined"
              onPress={() => dispatch(addToQueue(songs))}
            >
              Play All
            </Button>
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="shuffle"
                color={colors.primary}
                onPress={() => dispatch(shufflePlay(songs))}
              />
              <IconButton
                icon="search-outline"
                color={colors.primary}
                onPress={() => navigation.navigate('Find')}
              />
            </View>
          </View>
          <Divider />
        </CollapsibleSubHeaderAnimator>
      </Screen>
    );
  }
  return <Blank text="No offline songs found.." fetchData={fetchData} />;
};

const styles = StyleSheet.create({
  header: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 2,
    marginHorizontal: 10,
  },
});
