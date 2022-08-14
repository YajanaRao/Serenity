import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Animated,
  Pressable,
} from 'react-native';
import { useTheme, Text, IconButton, Surface } from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useScrollToTop } from '@react-navigation/native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';
import { StackNavigationProp } from '@react-navigation/stack';

import { Screen, Headline, Title } from '@serenity/components';
// import Genre from '../../data/genre.json';
import { Genre } from '@serenity/extensions';


import { SearchStackParamList, GenreProps } from './types';
import VoiceSearch from './components/VoiceSearch';

type SearchScreenNavigationProp = StackNavigationProp<
  SearchStackParamList,
  'Search'
>;

type Props = {
  navigation: SearchScreenNavigationProp;
};

export const SearchScreen = ({ navigation }: Props) => {
  const ref = useRef(null);
  const { colors, roundness } = useTheme();
  const [genres, setGenres] = useState([])
  useScrollToTop(ref);

  const {
    onScroll,
    containerPaddingTop,
    scrollIndicatorInsetTop,
    translateY,
  } = useCollapsibleHeader({
    navigationOptions: {
      headerStyle: {
        backgroundColor: colors.background,
      },
    },
  });

  const stickyHeaderHeight = 60;

  React.useEffect(() => {
    Genre.getGenres().then(data =>{
      console.log(data);
      setGenres(data);
    });
  }, [])

  return (
    <Screen>
      <Animated.FlatList
        onScroll={onScroll}
        contentContainerStyle={{
          paddingTop: containerPaddingTop + stickyHeaderHeight,
        }}
        scrollIndicatorInsets={{
          top: scrollIndicatorInsetTop + stickyHeaderHeight,
        }}
        ref={ref}
        key="Genre"
        data={genres}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={() => (
          <Headline style={styles.headline}>All Moods & Genres</Headline>
        )}
        renderItem={({ item }: { item: GenreProps }) => (
          <TouchableOpacity
            style={{
              flex: 1,
            }}
            onPress={() =>
              navigation.navigate('Filter', {
                genre: item,
              })
            }
          >
            <LinearGradient
              colors={[item.colors__001, item.colors__002]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.item}
            >
              <Title style={{ color: 'white' }} numberOfLines={1}>
                {item.title}
              </Title>
            </LinearGradient>
          </TouchableOpacity>
        )}
      />

      <Animated.View
        style={{
          transform: [{ translateY }],
          position: 'absolute',
          backgroundColor: colors.background,
          top: containerPaddingTop,
          height: stickyHeaderHeight,
          width: '100%',
        }}
      >
        <Surface style={styles.searchBarContainer}>
          <Pressable onPress={() => navigation.navigate('Find')}>
            <Surface
              style={[styles.searchInput, { borderRadius: roundness }]}
            >

              <IconButton icon="search-outline" />
              <Text
                style={[
                  styles.searchBarPlaceholder,
                  { color: colors.placeholder },
                ]}
              >
                Artists, songs or podcasts
              </Text>
            </Surface>
          </Pressable>
          <VoiceSearch />
        </Surface>

      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    elevation: 4,
    justifyContent: "space-between",
    flexDirection: "row"
  },
  searchInput: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
  },
  searchBarPlaceholder: { fontSize: 18, paddingLeft: 8 },
  item: {
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
    marginVertical: 4,
  },
});
