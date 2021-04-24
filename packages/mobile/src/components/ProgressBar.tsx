import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { ProgressBar } from 'react-track-player';

export const Progress = () => {
  const { colors } = useTheme();
  return (
    <View style={styles.view}>
      <ProgressBar
        style={styles.bar}
        thumbTintColor={colors.primary}
        trackTintColor={colors.primary}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 40,
    width: '100%',
  },
  bar: {
    height: 30,
    width: '100%',
  },
});
