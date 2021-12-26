import React from 'react';
import {
  TextStyle, Text as SimpleText, Platform, StyleProp,
} from 'react-native';
import { useTheme } from 'react-native-paper';

export interface TextProps {
  children: React.ReactChild | React.ReactChild[];
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}

export function Text({ children, style, numberOfLines = 2, ...rest }: TextProps) {
  const { colors } = useTheme();

  const fontFamily = Platform.OS === 'web' ? 'Nunito' : 'Nunito-ExtraBold';
  return (
    <SimpleText
      {...rest}
      numberOfLines={numberOfLines}
      style={[
        { fontFamily, color: colors.text, fontSize: 12 },
        style,
      ]}
    >
      {children}
    </SimpleText>
  );
}
