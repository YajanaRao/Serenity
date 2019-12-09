import React from 'react';
import { Subheading, Theme, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

interface TreeProps {
  message: string;
}

const Tree = ({ message }: TreeProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/tree.png')}
        style={[styles.icons, { backgroundColor: colors.background }]}
      />
      <Subheading>{message}</Subheading>
    </View>
  );
};

export default Tree;

const styles = StyleSheet.create({
  icons: {
    width: 209,
    height: 220,
    borderRadius: 4,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
