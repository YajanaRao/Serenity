import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface ContainerProps {
  style?: ViewProps;
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
