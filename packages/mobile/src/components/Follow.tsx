import React from 'react';
import { View, ViewProps } from 'react-native';
import { Chip } from 'react-native-paper';

interface Props {
  style?: ViewProps;
  liked: boolean;
  onPress(): void;
}

export const Follow = ({
  style,
  liked,
  onPress,
}: Props) => {
  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      {liked ? (
        <Chip mode="outlined" onPress={onPress}>
          Following
        </Chip>
      ) : (
        <Chip icon="plus" mode="outlined" onPress={onPress}>
          Follow
        </Chip>
      )}
    </View>
  );
};
