import React, { useState, useEffect } from 'react';
import {
  Portal,
  Dialog,
  Button,
  Searchbar,
  ActivityIndicator,
} from 'react-native-paper';
import { View, FlatList, Dimensions } from 'react-native';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import ArtistComponent from '../components/ArtistComponent';
import { useSelector } from 'react-redux';

interface ArtistProps {
  artist: string;
  artwork: string;
}

interface ItemProps {
  item: ArtistProps;
}

export interface Props {
  visible: boolean;
  hideDialog(): void;
  selectArtist(): void;
  addArtists(): void;
  removeArtist(): void;
}

function FollowArtistDialog({
  visible,
  hideDialog,
  selectArtist,
  addArtists,
  removeArtist,
}: Props) {
  const artists = useSelector((state: any) => state.mediaStore.artists);
  const [query, setQuery] = useState('');
  const [filtered, setFiltered] = useState(artists);

  useEffect(() => {
    let data = filter(artists, function(artist: ArtistProps) {
      return includes(artist.artist.toLowerCase(), query.toLowerCase());
    });
    console.log(data);
    setFiltered(data);
  }, [query]);

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Choose more artists you like.</Dialog.Title>
        <Dialog.Content>
          <Searchbar
            placeholder="Search"
            onChangeText={query => {
              setQuery(query);
            }}
            value={query}
          />
        </Dialog.Content>
        <Dialog.ScrollArea
          style={{ height: Dimensions.get('window').height - 300 }}
        >
          {artists.length ? (
            <FlatList
              data={filtered}
              keyExtractor={(item, index) => index.toString()}
              // numColumns={2}
              renderItem={({ item }: ItemProps) => (
                <ArtistComponent
                  item={item}
                  addArtist={selectArtist}
                  removeArtist={removeArtist}
                />
              )}
            />
          ) : (
            <View style={{ margin: 16 }}>
              <ActivityIndicator size="large" />
            </View>
          )}
        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button onPress={addArtists}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}

export default FollowArtistDialog;
