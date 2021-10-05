import React, { useRef, useEffect } from 'react';
import LottieView from 'lottie-react-native';
import { useSelector } from 'react-redux';
import { StyleProp, View, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animations from '../assets/Animations';

interface ActiveTrackIconProps {
  style: StyleProp<ViewStyle>;
}

const ActiveTrackIcon = ({ style }: ActiveTrackIconProps) => {
  const animatedRef = useRef<LottieView>(null);
  const { colors } = useTheme();
  const status = useSelector((state: any) => state.player.status);

  useEffect(() => {
    if (status === 'playing') {
      animatedRef.current?.play();
    } else {
      animatedRef.current?.pause();
    }
  }, [status]);

  return (
    <View style={[style, { justifyContent: 'center', alignItems: 'center' }]}>
      <LottieView
        ref={animatedRef}
        source={Animations.playerAnimation}
        colorFilters={[
          {
            keypath: 'Shape',
            color: colors.primary,
          },
        ]}
      />
    </View>
  );
};

export default ActiveTrackIcon;
