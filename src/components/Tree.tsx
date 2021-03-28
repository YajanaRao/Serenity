import React, { useRef } from 'react';
import { Subheading } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import { useFocusEffect } from '@react-navigation/core';
import Animations from '../assets/Animations';

interface TreeProps {
  message: string;
}

const Tree = ({ message }: TreeProps) => {
  const animatedRef = useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      animatedRef.current.play();

      return () => animatedRef.current.pause();
    }, []),
  );

  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 150,
          width: 500,
        }}
      >
        <LottieView
          ref={animatedRef}
          source={Animations.treeAnimation}
          // loop
        />
      </View>
      <Subheading style={{ textAlign: 'center', fontFamily: 'Nunito-Bold' }}>
        {message}
      </Subheading>
    </View>
  );
};

export default Tree;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  icons: {
    borderRadius: 4,
    height: 220,
    width: 209,
  },
});
