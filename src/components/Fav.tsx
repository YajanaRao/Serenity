import React from 'react';
import { View, ViewProps } from 'react-native';
import { IconButton } from 'react-native-paper';

interface FavProps {
  style: ViewProps;
  liked: boolean;
  addToFavorite(): void;
  removeFromFavorite(): void;
}

const Fav = ({ style, liked, addToFavorite, removeFromFavorite }: FavProps) => (
  <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
    {liked ? (
      <IconButton animated icon="heart" onPress={removeFromFavorite} />
    ) : (
      <IconButton animated icon="heart-outline" onPress={addToFavorite} />
    )}
  </View>
);

export default Fav;
