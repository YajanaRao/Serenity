import React, { useLayoutEffect, useState } from 'react';
import { View, Keyboard, FlatList } from 'react-native';
import { Text, Searchbar, useTheme } from 'react-native-paper';
import { Screen } from '@serenity/components';
import { selectFilteredSongs, useAppSelector } from '@serenity/core';
import { SongItem } from './components/SongItem';

export interface FindScreenProps { }

export function FindScreen({ navigation }: FindScreenProps) {
  const { colors } = useTheme();
  const [query, setQuery] = useState('');
  const songs = useAppSelector(state => selectFilteredSongs(state, query));

  const handleChange = (text: string) => {
    setQuery(text);
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <View style={[{ backgroundColor: colors.surface }]}>
          <Searchbar
            style={{ borderRadius: 0 }}
            placeholder="Artists, songs or podcasts"
            onChangeText={handleChange}
            // value={query}
            icon={navigation.goBack ? 'arrow-back-outline' : 'search-outline'}
            onIconPress={() => (navigation.goBack ? navigation.goBack() : Keyboard.dismiss())}
            clearIcon={query ? "close-outline" : "mic-outline"}
            autoFocus
          />
        </View>
      )
    })
  }, [navigation]);

  return (
    <Screen>
      {songs && songs.length ? (
        // <SectionList
        //   keyboardShouldPersistTaps="always"
        //   sections={songs}
        //   // ItemSeparatorComponent={() => <Divider inset />}
        //   keyExtractor={(item, index) => index.toString()}
        //   renderItem={({ item }: { item: number }) => (
        //     <TrackContainer track={item} goBack={navigation.goBack} />
        //   )}
        //   renderSectionHeader={({ section: { title } }) => (
        //     <List.Subheader>{title}</List.Subheader>
        //   )}
        // />
        <FlatList data={songs}
          keyExtractor={(item, index) => `search-${item}-${index}`}
          renderItem={({ item }) => (
            <SongItem id={item} />
          )}
        />
      ) : (
        <View
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
          <Text>No songs found</Text>
        </View>
      )}
    </Screen>
  );
}
