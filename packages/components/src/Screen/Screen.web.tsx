import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

interface ScreenProps {
  children: ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
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
      <div style={{ height: '100vh' }} className="screen">
        {children}
      </div>
    </SafeAreaView>
  );
};

export default Screen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
