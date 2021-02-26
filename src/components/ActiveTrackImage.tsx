import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

interface StyleProps {
  height: number;
}

interface ActiveTrackImageProps {
  style: StyleProps;
}

const ActiveTrackImage = ({ style }: ActiveTrackImageProps) => {
  return (
    <LinearGradient
      colors={['#C9D6FF', '#E2E2E2']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <LottieView source={require('../assets/Player.json')} autoPlay loop />
    </LinearGradient>
  );
};
export default ActiveTrackImage;
