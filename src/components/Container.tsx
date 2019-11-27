import React, { ReactNode } from 'react';
import { View, StyleSheet, ViewProps } from 'react-native';

interface ContainerProps {
  style?: ViewProps;
  children: ReactNode;
}

const Container = ({ style, children }: ContainerProps) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
