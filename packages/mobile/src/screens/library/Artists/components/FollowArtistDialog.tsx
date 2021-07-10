import React, { useState, useEffect } from 'react';
import { Portal, Dialog, Button, Searchbar, Text, IconButton } from 'react-native-paper';
import { View, FlatList, Dimensions } from 'react-native';
import filter from 'lodash/filter';
import includes from 'lodash/includes';

import { useDispatch, useSelector } from 'react-redux';
import { artistsSelectors, artistUpdated, selectFilteredArtists } from '@serenity/core';
import { ArtistList } from './ArtistList';

export interface Props {
  visible: boolean;
  hideDialog(): void;
}

export const FollowArtistDialog = ({
  visible,
  hideDialog,
}: Props) => {
  const [query, setQuery] = useState('');
  const [text, setText] = useState('');
  const artists = useSelector((state: any) => selectFilteredArtists(state, query));




  return (
    <Portal>
      <Dialog visible={visible} onDismiss={hideDialog}>
        <Dialog.Title>Choose more artists you like.</Dialog.Title>
        <Dialog.ScrollArea
          style={{ height: Dimensions.get('window').height - 300 }}
        >
          <FlatList
            data={artists}
            keyExtractor={(item, index) => index.toString()}
            // numColumns={2}
            ListHeaderComponent={() => (
              <Searchbar
                icon={() => <IconButton icon="search-outline" />}
                clearIcon={() => <IconButton icon="close" />}
                placeholder="Search"
                onChangeText={setText}
                onEndEditing={() => setQuery(text)}
                autoFocus
                blurOnSubmit={false}
                value={text}
              />
            )}
            ListEmptyComponent={() => (
              <View style={{ margin: 16 }}>
                <Text>No Artists found in Local library</Text>
              </View>
            )}
            renderItem={({ item }: { item: number }) => (
              <ArtistList
                id={item}
              />
            )}
          />

        </Dialog.ScrollArea>
        <Dialog.Actions>
          <Button onPress={hideDialog}>Cancel</Button>
          <Button mode="contained" onPress={hideDialog}>Done</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
