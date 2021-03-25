import React, { useRef } from 'react';
import { StyleSheet, TouchableOpacity, FlatList, Animated } from 'react-native';
import {
  Subheading,
  Title,
  Divider,
  useTheme,
  Button,
  Searchbar,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import { useScrollToTop } from '@react-navigation/native';
import { useCollapsibleHeader } from 'react-navigation-collapsible';

import Genre from '../../data/genre.json';
import { Screen } from '../../components/Screen';

interface GenreProps {
  item: {
    colors: [];
    title: string;
  };
}

export const SearchScreen = ({ navigation }) => {
  const ref = useRef(null);
  const { colors } = useTheme();
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
        <Searchbar
          value=""
          placeholder="Artists, songs or podcasts"
          icon="search-outline"
          onTouchStart={() => navigation.navigate('Find')}
          style={{ marginHorizontal: 10, marginVertical: 6 }}
        />
      </Animated.View>
    </Screen>
  );
};

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
