import React, { useState, useEffect } from 'react';
import { Portal, Dialog, Button, Searchbar, Text, IconButton } from 'react-native-paper';
import { View, FlatList, Dimensions } from 'react-native';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import { useDispatch, useSelector } from 'react-redux';
import { ArtistComponent } from './ArtistComponent';
import { ArtistProps } from '../../../../utils/types';
import { selectArtistIds, toggleArtistLike } from '@serenity/core';

export interface Props {
  visible: boolean;
  hideDialog(): void;
}

export const FollowArtistDialog = ({
  visible,
  hideDialog,
}: Props) => {
  const artists = useSelector((state: any) => selectArtistIds(state));
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(artists);

  useEffect(() => {
    // const data = filter(artists, (artist: ArtistProps) => {
    //   return includes(artist.artist.toLowerCase(), query.toLowerCase());
    // });
    // setFiltered(data);
  }, [query, artists]);

  const dispatch = useDispatch();

  const toggleLike = (id: string) => {
    dispatch(toggleArtistLike(id))
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Choose more artists you like.</Dialog.Title>
        <Dialog.ScrollArea
          style={{ height: Dimensions.get('window').height - 300 }}
        >
          {artists.length ? (
            <FlatList
              data={filtered}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
              ListHeaderComponent={() => (
                <Searchbar
                  icon={() => <IconButton icon="search-outline" />}
                  clearIcon={() => <IconButton icon="close" />}
                  placeholder="Search"
                  onChangeText={query => {
                    setQuery(query);
                  }}
                  value={query}
                />
              )}
              renderItem={({ item }: { item: string }) => (
                <ArtistComponent
                  id={item}
                  toggleLike={toggleLike}
                />
              )}
            />
          ) : (
            <View style={{ margin: 16 }}>
              <Text>No Artists found in Local library</Text>
            </View>
          )}
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button mode="contained" onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
