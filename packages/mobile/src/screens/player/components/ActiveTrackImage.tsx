import React, { useRef, useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { ViewStyle } from 'react-native';
import Animations from '../../../assets/Animations';

interface ActiveTrackImageProps {
  style: ViewStyle;
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
      colors={['#faf1e6', '#e4efe7']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <LottieView ref={animatedRef} source={Animations.activeTrack} />
    </LinearGradient>
  );
};
export default ActiveTrackImage;
