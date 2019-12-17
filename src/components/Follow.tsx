import React from 'react';
import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props {
  style: ViewProps;
  liked: boolean;
  addToFavorite(): void;
  removeFromFavorite(): void;
}

export const Follow = ({
  style,
  liked,
  addToFavorite,
  removeFromFavorite,
}: Props) => {
  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      {liked ? (
        <Chip mode="outlined" onPress={removeFromFavorite}>
          Following
        </Chip>
      ) : (
        <Chip icon="plus" mode="outlined" onPress={addToFavorite}>
          Follow
        </Chip>
      )}
    </View>
  );
};
