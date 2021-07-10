import React, { useState, useRef, useEffect } from 'react';
import {
  Divider,
  Button,
  IconButton,
  useTheme,
  ActivityIndicator,
} from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
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
  giveReadOfflineAccess, fetchOfflineSongs, addSongToPlaylist, playSong, addSongToQueue,
  shufflePlay,
  songsSelectors
} from '@serenity/core';



import { Blank } from '../../../components/Blank';
import { PlaylistDialog } from '../../../components/Dialogs/PlaylistDialog';
import { TrackProps } from '../../../utils/types';
import { RootReducerType } from '../../../../../core/src/reducers';
// import { addSongsToPlaylist } from '../../actions/playlist';
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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.ui,
  );

  const songs = useSelector(state => songsSelectors.selectIds(state));
  const { error, loading } = useSelector(state => state.songs)

  const fetchSongs = async () => {
    try {
      // setRefreshing(true)
      await dispatch(fetchOfflineSongs())
      // setRefreshing(false);
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
  }, [songs]);

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
    console.log('playSong');
    dispatch(playSong(song));
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
                onPress={() => dispatch(shufflePlay(songs))}
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
