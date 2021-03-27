import React from 'react';
import { TextStyle, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface HeadlineProps {
  children: string;
  style?: TextStyle;
}

export function Headline({ children, style }: HeadlineProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        { fontFamily: 'Nunito-ExtraBold', color: colors.text, fontSize: 24 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
