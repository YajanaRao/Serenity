import * as React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import {IconButton} from '@serenity/components';
interface FavProps {
  style?: StyleProp<ViewStyle>;
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
        // animated
        name="heart"
        onPress={onPress}
        color="#f64f59"
      />
    ) : (
      <IconButton name="heart-outline" onPress={onPress} />
    )}
  </View>
);
