import * as React from 'react';
import {
  View, StyleSheet, ViewStyle, StyleProp,
} from 'react-native';

interface ContainerProps {
  style?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const Container = ({ children, style = {} }: ContainerProps) => <View style={[styles.container, style]}>{children}</View>;

export default Container;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
