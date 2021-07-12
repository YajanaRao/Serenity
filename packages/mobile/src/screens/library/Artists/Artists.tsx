import React, { useState, useRef } from 'react';
import { FlatList } from 'react-native';
import { Avatar, List } from 'react-native-paper';
import { useScrollToTop } from '@react-navigation/native';
import { Screen } from '@serenity/components';
import { useSelector } from 'react-redux';
import { selectLikedArtists } from '@serenity/core';
import { Artist } from './components/Artist';

export const ArtistScreen = ({ navigation }) => {
  const ref = useRef(null);
  useScrollToTop(ref);

  const artists = useSelector(state => selectLikedArtists(state));


  return (
    <Screen>
      <FlatList
        ref={ref}
        ListHeaderComponent={() => (
          <List.Item
            title="Add artist"
            left={() => (
              <Avatar.Icon
                size={54}
                // style={{ backgroundColor: colors.surface }}
                icon="plus"
              />
            )}
            onPress={() => navigation.navigate('FollowArtists')}
          />
        )}
        data={artists}
        keyExtractor={(item) => item}
        renderItem={({ item }: { item: string }) => <Artist id={item} />}
      />
    </Screen>
  );
};
