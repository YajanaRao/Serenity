import * as React from 'react';
import { View, ViewProps } from 'react-native';
import { IconButton } from 'react-native-paper';

interface FavProps {
  style?: ViewProps;
  liked: boolean;
  onPress(): void;
}

export const Fav = ({
  style,
  liked = false,
  onPress
}: FavProps) => (
  <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
    {liked ? (
      <IconButton
        animated
        icon="heart"
        onPress={onPress}
        color="#f64f59"
      />
    ) : (
      <IconButton animated icon="heart-outline" onPress={onPress} />
    )}
  </View>
);
