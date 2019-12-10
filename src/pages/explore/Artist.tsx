import React, { useState, useEffect } from 'react';
import { FlatList } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import remove from 'lodash/remove';

import { FollowArtistDialog } from '../../containers/FollowArtistDialog';
import { addArtist, getArtists } from '../../actions/realmAction';
import { deserializeArtists } from '../../utils/database';
import { Screen } from '../../components/Screen';
import { ArtistProps } from '../../types';

export const ArtistScreen = ({ navigation }) => {
  const realmArtists = getArtists();

  const [favArtists, setFavArtists] = useState([]);
  const [visible, setVisible] = useState(false);
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
    const uArtists = favArtists;
    uArtists.push(artist);
    setFavArtists(uArtists);
  };

  const removeArtist = (artist: ArtistProps) => {
    const uArtists = remove(favArtists, function(item: ArtistProps) {
      return item.id === artist.id;
    });
    setFavArtists(uArtists);
  };

  const addArtists = () => {
    favArtists.forEach((artist: ArtistProps) => addArtist(artist));
    hideDialog();
  };

  const showDialog = () => {
    setVisible(true);
  };

  const hideDialog = () => {
    setVisible(false);
  };

  return (
    <Screen>
      <FlatList
        ListHeaderComponent={() => (
          <List.Item
            title="Add artist"
            left={() => (
              <Avatar.Icon
                // {...props}
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
            left={() => <Avatar.Image source={{ uri: item.cover }} />}
            onPress={() => {
              navigation.navigate('ArtistSongs', {
                artist: item,
              });
            }}
          />
        )}
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
