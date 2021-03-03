import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import { useTheme } from 'react-native-paper';
// import SafeAreaView from 'react-native-safe-area-view';

interface ScreenProps {
  children: ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  const theme = useTheme();
  const { colors, dark } = theme;
  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}
    >
      <StatusBar
        barStyle={dark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.surface}
      />
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
