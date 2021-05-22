import React, { useState, useEffect, useRef } from 'react';
import { FlatList, RefreshControl } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import remove from 'lodash/remove';
import { useScrollToTop } from '@react-navigation/native';
import generate from 'string-to-color';

import { FollowArtistDialog } from './components/FollowArtistDialog';
import { addArtist, getArtists } from '../../actions/realmAction';
import { deserializeArtists } from '../../utils/database';
import { Screen } from 'components';
import { ArtistProps } from '../../utils/types';

export const ArtistScreen = ({ navigation }) => {
  const ref = useRef(null);
  let followArtists: ArtistProps[] = [];
  useScrollToTop(ref);
  let realmArtists = getArtists();

  const [visible, setVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [artists, setArtists] = useState(() => {
    return deserializeArtists(realmArtists);
  });

  useEffect(() => {
    const listener = (artists: ArtistProps, changes: any) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        const artist = deserializeArtists(artists);
        setArtists(artist);
      }
    };
    if (realmArtists !== undefined) {
      realmArtists.addListener(listener);
    }
    return () => {
      realmArtists.removeListener(listener);
    };
  }, [realmArtists]);

  const selectArtist = (artist: ArtistProps) => {
    followArtists.push(artist);
  };

  const removeArtist = (artist: ArtistProps) => {
    remove(followArtists, (item: ArtistProps) => {
      return item.id === artist.id;
    });
  };

  const addArtists = () => {
    followArtists.forEach((artist: ArtistProps) => addArtist(artist));
    hideDialog();
  };

  const showDialog = () => {
    followArtists = [];
    setVisible(true);
  };

  const hideDialog = () => {
    followArtists = [];
    setVisible(false);
  };

  const onRefresh = () => {
    setRefreshing(true);
    realmArtists = getArtists();
    const updatedList = deserializeArtists(realmArtists);
    setArtists(updatedList);
    setRefreshing(false);
  };

  return (
    <Screen>
      <FlatList
        ref={ref}
        ListHeaderComponent={() => (
          <List.Item
            title="Add artist"
            left={() => (
              <Avatar.Icon
                size={54}
                // style={{ backgroundColor: colors.surface }}
                icon="plus"
              />
            )}
            onPress={showDialog}
          />
        )}
        data={artists}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }: { item: ArtistProps }) => (
          <List.Item
            title={item.name}
            left={() => (
              <Avatar.Text
                size={54}
                style={{ backgroundColor: generate(item.name) }}
                label={item.name.charAt(0)}
              />
            )}
            onPress={() => {
              navigation.navigate('ArtistSongs', {
                artist: item,
              });
            }}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <FollowArtistDialog
        visible={visible}
        hideDialog={hideDialog}
        addArtists={addArtists}
        selectArtist={selectArtist}
        removeArtist={removeArtist}
      />
    </Screen>
  );
};
