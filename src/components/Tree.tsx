import React from 'react';
import { Subheading, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

interface TreeProps {
  message: string;
}

export const Tree = ({ message }: TreeProps) => {
  const theme = useTheme();
  const { colors } = theme;
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
        <LottieView source={require('../assets/Tree.json')} autoPlay loop />
      </View>
      <Subheading>{message}</Subheading>
    </View>
  );
};

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
