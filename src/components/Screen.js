import React from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme } from 'react-native-paper';

const Screen = ({ theme, children }) => {
  const { colors } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {children}
    </View>
  );
};

export default withTheme(Screen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
