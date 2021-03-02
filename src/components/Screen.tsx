import React, { ReactNode } from 'react';
import { StyleSheet, SafeAreaView, StatusBar, View } from 'react-native';
import { useTheme } from 'react-native-paper';

interface ScreenProps {
  children: ReactNode;
}

export const Screen = ({ children }: ScreenProps) => {
  const theme = useTheme();
  const { colors, dark } = theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.statusBar, { backgroundColor: colors.surface }]}>
        <SafeAreaView>
          <StatusBar
            translucent
            barStyle={dark ? 'light-content' : 'dark-content'}
            backgroundColor={colors.surface}
          />
        </SafeAreaView>
      </View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  statusBar: {
    height: StatusBar.currentHeight,
    // height: 100,
  },
});
