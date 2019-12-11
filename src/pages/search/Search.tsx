import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { Subheading, Title, Divider } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useSelector } from 'react-redux';
import Genre from '../../data/genre.json';
import { Screen } from '../../components/Screen';
import { TrackContainer } from '../../containers/TrackContainer';
import { TrackProps } from '../../types.js';
import { RootReducerType } from '../../reducers/index.js';
import { useScrollToTop } from '@react-navigation/native';

interface GenreProps {
  item: {
    colors: [];
    title: string;
  };
}

function Search({ navigation }) {
  const ref = useRef();
  useScrollToTop(ref);
  const searchResult = useSelector(
    (state: RootReducerType) => state.query.searchResult,
  );

  return (
    <Screen>
      {searchResult ? (
        <FlatList
          data={searchResult}
          key={searchResult.length}
          ItemSeparatorComponent={() => <Divider inset />}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: TrackProps }) => (
            <TrackContainer track={item} />
          )}
        />
      ) : (
        <FlatList
          ref={ref}
          key="Genre"
          data={Genre}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          ListHeaderComponent={() => (
            <Title style={styles.headline}>All Moods & Genres</Title>
          )}
          renderItem={({ item }: GenreProps) => (
            <TouchableOpacity
              style={{
                flex: 1,
              }}
              onPress={() =>
                navigation.navigate('Filter', {
                  songs: [],
                  genre: item,
                })
              }
            >
              <LinearGradient
                colors={item.colors}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.item}
              >
                <Subheading style={{ color: 'white' }} numberOfLines={1}>
                  {item.title}
                </Subheading>
              </LinearGradient>
            </TouchableOpacity>
          )}
        />
      )}
    </Screen>
  );
}

export default Search;

const styles = StyleSheet.create({
  searchbar: {
    margin: 10,
  },
  item: {
    // backgroundColor: Colors.lightBlueA100,
    borderRadius: 4,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    margin: 4,
    elevation: 8,
  },
  headline: {
    textAlign: 'center',
  },
});
