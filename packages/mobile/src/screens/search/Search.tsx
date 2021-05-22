import React, { useRef } from 'react';
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

import Genre from '../../data/genre.json';
import { Screen, Headline, Title } from 'components';

interface GenreProps {
  item: {
    colors: [];
    title: string;
  };
}

export const SearchScreen = ({ navigation }) => {
  const ref = useRef(null);
  const { colors, roundness } = useTheme();
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
        data={Genre}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        ListHeaderComponent={() => (
          <Headline style={styles.headline}>All Moods & Genres</Headline>
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
        <Pressable onPress={() => navigation.navigate('Find')}>
          <Surface
            style={[styles.searchBarContainer, { borderRadius: roundness }]}
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
      </Animated.View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  searchbar: {
    margin: 10,
  },
  searchBarContainer: {
    marginHorizontal: 10,
    marginVertical: 6,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 4,
  },
  searchBarPlaceholder: { fontSize: 18, paddingLeft: 8 },
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
    marginVertical: 4,
  },
});
