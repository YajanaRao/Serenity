import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface StyleProps {
  height: number;
}

interface DefaultImageProps {
  style: StyleProps;
}

const DefaultImage = ({ style }: DefaultImageProps) => {
  return (
    <LinearGradient colors={['#11998e', '#38ef7d']} style={style}>
      <Icon name="music" color="#ffffff" size={style.height || 100} />
    </LinearGradient>
  );
};

export default DefaultImage;
