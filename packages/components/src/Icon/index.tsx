import * as React from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useTheme } from 'react-native-paper';
import ICONS from './Icon';

export interface IconProps {
  name: string;
  size?: number;
  color?: string;
  direction?: 'rtl' | 'ltr';
  allowFontScaling?: boolean | undefined;
  style?: StyleProp<ViewStyle>
}

export const Icon = ({
  name, size = 40, color, ...props
}: IconProps) => {
  const { colors } = useTheme();
  // @ts-ignore
  const IconImpl = ICONS[name];
  if (!IconImpl) console.error('missing icon', name);
  if(!color) color = colors.text;
  return IconImpl ? (
    <IconImpl width={size} height={size} color={color} {...props} />
  ) : null;
};
