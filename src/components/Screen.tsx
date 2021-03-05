import React, { ReactNode } from 'react';
import { StatusBar, StyleSheet, SafeAreaView } from 'react-native';
import {
  useTheme,
  Dialog,
  ActivityIndicator,
  Portal,
} from 'react-native-paper';
// import SafeAreaView from 'react-native-safe-area-view';

interface ScreenProps {
  children: ReactNode;
  isLoading?: boolean;
  onDismiss?: () => void;
}

export const Screen = ({
  children,
  isLoading = false,
  onDismiss,
}: ScreenProps) => {
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
      <Portal>
        <Dialog visible={isLoading} onDismiss={onDismiss}>
          <Dialog.Content style={{ backgroundColor: colors.surface }}>
            <ActivityIndicator />
          </Dialog.Content>
        </Dialog>
      </Portal>
      {children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
