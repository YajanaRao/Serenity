import React, { useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';

interface StyleProps {
  height: number;
}

interface ActiveTrackImageProps {
  style: StyleProps;
}

const ActiveTrackImage = ({ style }: ActiveTrackImageProps) => {
  const animatedRef = useRef(null);
  const status = useSelector((state: any) => state.playerState.status);

  useEffect(() => {
    if (status === 'playing') {
      animatedRef.current.play();
    } else {
      animatedRef.current.pause();
    }
  }, [status]);

  return (
    <LinearGradient
      colors={['#8360c3', '#2ebf91']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <LottieView ref={animatedRef} source={require('../assets/Player.json')} />
    </LinearGradient>
  );
};
export default ActiveTrackImage;
