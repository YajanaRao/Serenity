import * as React from 'react';
import { View, Keyboard, FlatList } from 'react-native';
import { Text, Searchbar, useTheme, IconButton } from 'react-native-paper';
import { Screen } from '@serenity/components';
import { selectFilteredSongs, useAppSelector } from '@serenity/core';
import { SongItem } from './components/SongItem';
import analytics from '@react-native-firebase/analytics';

export interface FindScreenProps { }

export function FindScreen({ navigation, route }: FindScreenProps) {
  const { colors } = useTheme();
  const [query, setQuery] = React.useState(route.params?.query);
  const songs = useAppSelector(state => selectFilteredSongs(state, query));

  const handleChange = (text: string) => {

    React.startTransition(() => {
      setQuery(text);
      analytics().logSearch({
        search_term: text
      })
    })
  };

  return (
    <Screen>
      <View style={[{ backgroundColor: colors.surface }]}>
        <Searchbar
          style={{ borderRadius: 0 }}
          placeholder="Artists, songs or podcasts"
          onChangeText={handleChange}
          defaultValue={query}
          icon={navigation.goBack ? 'arrow-back-outline' : 'search-outline'}
          onIconPress={() => (navigation.goBack ? navigation.goBack() : Keyboard.dismiss())}
          clearIcon={() => <IconButton icon="close-outline" onPress={() => setQuery("")}/>}
          autoFocus
        />
      </View>
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
          keyExtractor={(index) => `search-${index}`}
          renderItem={({ item }) => (
            <SongItem track={item} />
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
