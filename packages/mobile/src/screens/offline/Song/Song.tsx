import React, { useState, useRef, useEffect } from 'react';
import {
  Divider,
  Button,
  IconButton,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import {
  View,
  RefreshControl,
  StyleSheet,
  Animated,
} from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';
import {
  useCollapsibleSubHeader,
  CollapsibleSubHeaderAnimator,
} from 'react-navigation-collapsible';

import { Screen } from '@serenity/components';
import {
  Player,
  giveReadOfflineAccess, fetchOfflineSongs, addSongToPlaylist, playSong, addSongToQueue,
  songsSelectors,
  useAppSelector,
  useAppDispatch
} from '@serenity/core';



import { Blank } from '~/components/Blank';
import { PlaylistDialog } from '~/components/Dialogs/PlaylistDialog';
import { TrackProps } from '~/utils/types';
import { SongItem } from './components/SongItem';
import { SongOptions } from './components/SongOptions';

interface ItemProps {
  item: number;
}

export const SongScreen = () => {

  const bs = useRef();

  const ref = useRef(null);
  useScrollToTop(ref);
  const [visible, setVisible] = useState('');
  const [song, setSong] = useState();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);
  const songs = useAppSelector(state => songsSelectors.selectIds(state));
  const { error, loading } = useAppSelector(state => state.songs)

  const fetchSongs = async () => {
    try {
      await dispatch(fetchOfflineSongs())
    } catch (err) {
      console.log('error', `Fetch failed: ${err.message}`)
    }
  }

  const {
    onScroll /* Event handler */,
    containerPaddingTop /* number */,
    scrollIndicatorInsetTop /* number */,
    translateY,
  } = useCollapsibleSubHeader();

  useEffect(() => {
    if (!songs.length) {
      fetchSongs();
    }
  }, []);

  const fetchData = () => {
    if (offlineReadAccessGiven && !loading) {
      fetchSongs();
    }
  };

  const showDialog = () => {
    setVisible('DIALOG');
  };



  const addToPlaylist = (id: string) => {
    dispatch(addSongToPlaylist(id, song.id));
    setVisible('');
  };

  const play = (song: TrackProps) => {
    dispatch(Player.playSong(song));
  };

  const openBottomSheet = () => {
    bs.current.snapTo(0);
  };

  const closeBottomSheet = () => {
    bs.current.snapTo(1);
  };

  const openMenu = (song: TrackProps) => {
    setSong(song);
    openBottomSheet();
  };


  if (songs.length) {
    return (
      <Screen>
        <PlaylistDialog
          visible={visible === 'DIALOG'}
          hideModal={() => setVisible('')}
          addToPlaylist={addToPlaylist}
        />
        <SongOptions
          bs={bs}
          song={song}
          closeBottomSheet={closeBottomSheet}
          playSong={play}
          addSongToPlaylist={showDialog}
        />
        <Animated.FlatList
          onScroll={onScroll}
          contentContainerStyle={{ paddingTop: containerPaddingTop }}
          scrollIndicatorInsets={{ top: scrollIndicatorInsetTop }}
          ref={ref}
          data={songs}
          renderItem={({ item }: ItemProps) => <SongItem id={item} onPress={play} openMenu={openMenu} />}
          // ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item) => item}
          refreshControl={
            <RefreshControl
              progressViewOffset={32}
              refreshing={loading}
              onRefresh={fetchData}
            />
          }
        />

        <CollapsibleSubHeaderAnimator translateY={translateY}>
          <View style={[styles.header, { backgroundColor: colors.background }]}>
            <Button
              icon="play"
              mode="outlined"
              onPress={() => dispatch(addSongToQueue(songs))}
            >
              Play All
            </Button>
            <View style={{ flexDirection: 'row' }}>
              <IconButton
                icon="shuffle-outline"
                color={colors.primary}
                onPress={() => dispatch(Player.repeat("shuffle"))}
              />
              <IconButton
                icon="search-outline"
                color={colors.primary}
                onPress={() =>
                  navigation.navigate('Find', {
                    type: 'offline',
                  })
                }
              />
            </View>
          </View>
          <Divider />
        </CollapsibleSubHeaderAnimator>
      </Screen>
    );
  }
  if (!offlineReadAccessGiven || error) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }
  if (loading) {
    return <ActivityIndicator />
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
