import React from 'react';
import { Subheading } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import Animations from '../assets/Animations';

interface TreeProps {
  message: string;
}

const Tree = ({ message }: TreeProps) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          height: 150,
          width: '100%',
        }}
      >
        <LottieView source={Animations.treeAnimation} autoPlay loop />
      </View>
      <Subheading>{message}</Subheading>
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
