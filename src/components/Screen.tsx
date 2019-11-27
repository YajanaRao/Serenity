import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Theme } from 'react-native-paper';

interface ScreenProps {
  theme: Theme;
  children: ReactNode;
}

const Screen = ({ theme, children }: ScreenProps) => {
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
