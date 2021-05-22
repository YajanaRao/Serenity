import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// @ts-ignore
import { Icon } from 'components';

interface StyleProps {
  height: number;
}

interface DefaultImageProps {
  style: StyleProps;
}

export const DefaultImage = ({ style }: DefaultImageProps) => {
  return (
    <LinearGradient
      colors={['#C9D6FF', '#E2E2E2']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <Icon
        name="music-outline"
        color="#ffffff"
        size={style.height < 200 ? style.height - 10 : 100}
      />
    </LinearGradient>
  );
};
