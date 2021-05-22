import React from 'react';
import { View } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Button } from 'react-native-paper';

import { useNavigation } from '@react-navigation/core';
import { TrackScrollView } from '../../../components/TrackScrollView';
import { playTrack } from '../../../actions/playerState';
import { TrackProps } from '../../../utils/types';
import { Headline } from 'components';
import { usePlaylistSongs } from '../../../hooks/usePlaylistSongs';
import { HISTORY_PLAYLIST_ID } from '../../../database/consts';
import { useDispatch } from 'react-redux';

export const RecentContainer = () => {
  const navigation = useNavigation();
  const history = usePlaylistSongs(HISTORY_PLAYLIST_ID);
  const dispatch = useDispatch();

  // const [history, setHistory] = useState(() => {
  //   return deserializeSongs(realmSongs);
  // });
  // useEffect(() => {
  //   const listener = (songs: TrackProps, changes: any) => {
  //     if (
  //       changes.insertions.length > 0 ||
  //       changes.modifications.length > 0 ||
  //       changes.deletions.length > 0
  //     ) {
  //       const song = deserializeSongs(songs);
  //       setHistory(song);
  //     }
  //   };
  //   if (realmSongs !== undefined && !realm.isInTransaction) {
  //     realmSongs.addListener(listener);
  //     return () => realmSongs.removeListener(listener);
  //   }
  // }, [realmSongs]);

  const play = (track: TrackProps) => {
    if (!isEmpty(track)) {
      dispatch(playTrack(track));
    }
  };

  const navigateToSongs = () => {
    const playlist = {
      id: 'user-playlist--000001',
      name: 'Recent songs',
      owner: 'Serenity',
    };
    navigation.navigate('Playlist', {
      playlist,
    });
  };

  if (history.length) {
    return (
      <View>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Headline>Recently Played</Headline>
          {history.length > 3 ? (
            <Button onPress={navigateToSongs} uppercase={false}>
              More
            </Button>
          ) : null}
        </View>
        <TrackScrollView data={history} play={play} />
      </View>
    );
  }
  return null;
};
