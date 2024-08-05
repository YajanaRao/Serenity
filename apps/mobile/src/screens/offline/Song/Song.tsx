import React, { useState, useRef, useEffect } from 'react';
import {
  Divider,
  IconButton,
  useTheme,
} from 'react-native-paper';
import {
  View,
  RefreshControl,
  StyleSheet,
  FlatList,
} from 'react-native';
import { useNavigation, useScrollToTop } from '@react-navigation/native';

import { Screen, Button } from '@serenity/components';
import {
  Player,
  UI,
  Native,
  Playlist,
  songsSelectors,
  useAppSelector,
  useAppDispatch,
  EntityId,
  SongProps
} from '@serenity/core';
import { Blank } from 'components/Blank';
import { PlaylistDialog } from 'components/Dialogs/PlaylistDialog';
import { TrackProps } from 'utils/types';
import { SongItem } from './components/SongItem';
import { SongOptions } from './components/SongOptions';
import BottomSheet from '@gorhom/bottom-sheet';
import { log } from 'utils/logging';


export const SongScreen = () => {

  const bottomSheetModalRef = React.useRef<BottomSheet>(null);

  const ref = useRef(null);
  useScrollToTop(ref);
  const [visible, setVisible] = useState('');
  const [song, setSong] = useState<EntityId>();
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const { colors } = useTheme();

  const { offlineReadAccessGiven } = useAppSelector((state) => state.ui);
  const songs = useAppSelector(state => songsSelectors.selectAll(state));
  const { error, loading } = useAppSelector(state => state.songs)

  useEffect(() => {
    if (!songs.length) {
      fetchSongs();
    }
  }, []);

  async function fetchSongs() {
    try {
      if (offlineReadAccessGiven && !loading) {
        await dispatch(Native.getSongs())
      }
    } catch (err) {
      log.error('error', `Fetch failed: ${err.message}`)
    }
  }


  function showDialog() {
    setVisible('DIALOG');
  };



  const addToPlaylist = (id: string) => {
    dispatch(Playlist.addSongToPlaylist(id, song));
    setVisible('');
  };

  function play(song: TrackProps) {
    dispatch(Player.playSong(song));
  };

  const openBottomSheet = React.useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  function openMenu(songId: EntityId) {
    setSong(songId);
    openBottomSheet();
  };

  if (!offlineReadAccessGiven || error) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(UI.giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }


  if (songs.length) {
    return (
      <Screen>
        <View style={[styles.header, { backgroundColor: colors.background }]}>
          <Button
            icon="play"
            onPress={() => dispatch(Player.add(songs))}
          >
            Play All
          </Button>
          <View style={{ flexDirection: 'row' }}>
            <IconButton
              icon="shuffle-outline"
              color={colors.primary}
              onPress={() => dispatch(Player.repeatSongs("shuffle"))}
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
        <PlaylistDialog
          visible={visible === 'DIALOG'}
          hideModal={() => setVisible('')}
          addToPlaylist={addToPlaylist}
        />
        <SongOptions
          bs={bottomSheetModalRef}
          id={song}
          addSongToPlaylist={showDialog}
        />
        <FlatList
          ref={ref}
          data={songs}
          renderItem={({ item }: { item: SongProps }) => <SongItem id={item.id} onPress={play} openMenu={openMenu} />}
          keyExtractor={(item: SongProps) => `song-${item.id}`}
          refreshControl={
            <RefreshControl
              progressViewOffset={32}
              refreshing={loading}
              onRefresh={fetchSongs}
            />
          }
        />
      </Screen>
    );
  }

  return <Blank text="No offline songs found.." fetchData={fetchSongs} />;
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
