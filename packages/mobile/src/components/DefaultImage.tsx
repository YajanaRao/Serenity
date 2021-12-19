import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// @ts-ignore
import { Icon } from '@serenity/components';
import { StyleProp, ViewStyle } from 'react-native';


interface DefaultImageProps {
  style: StyleProp<ViewStyle>;
  size?: number;
}

export const DefaultImage = ({ style, size = 50 }: DefaultImageProps) => {
  return (
    <LinearGradient
      colors={['#C9D6FF', '#E2E2E2']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <Icon
        name="music-outline"
        color="#ffffff"
        size={size < 200 ? size - 10 : 100}
      />
    </LinearGradient>
  );
};
