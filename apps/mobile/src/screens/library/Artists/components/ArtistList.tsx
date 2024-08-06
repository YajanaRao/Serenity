import React from 'react';
import { Avatar, Badge, List } from 'react-native-paper';
import { View } from 'react-native';
import generate from 'string-to-color';
import { artistsSelectors, useAppDispatch, useAppSelector, artistUpdated } from '@serenity/core';

interface Props {
  id: number;
}

export const ArtistList = ({ id }: Props) => {
  const artist = useAppSelector(state => artistsSelectors.selectById(state, id))
  const dispatch = useAppDispatch();

  const toggleLike = () => {
    dispatch(artistUpdated({ id, changes: { liked: !artist.liked } }))
  };


  return (
    <List.Item
      title={artist.artist}
      left={() => (
        <View>
          <Badge
            style={{
              right: 2,
              top: -2,
              position: 'absolute',
              zIndex: 10,
            }}
            size={24}
            visible={artist.liked === true}
          />
          <Avatar.Text
            size={54}
            style={{ backgroundColor: generate(artist.name), margin: 0 }}
            label={artist.artist.charAt(0)}
          />
        </View>
      )}
      onPress={toggleLike}
    />
  );
};
