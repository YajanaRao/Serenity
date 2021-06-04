import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewStyle, StyleProp } from 'react-native';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}

export const Container = ({ style, children }: ContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
