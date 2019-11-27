import React from 'react';

// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { withTheme, Theme } from 'react-native-paper';

export interface ThemedIconProps {
  name: string;
  size: number;
  theme: Theme;
}

const ThemedIcon = ({ name, size, theme }: ThemedIconProps) => {
  const { colors } = theme;
  return <Icon name={name} color={colors.text} size={size} />;
};

export default withTheme(ThemedIcon);
