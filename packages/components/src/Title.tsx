import React from 'react';
import { TextStyle, Text } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface TitleProps {
  children: string;
  style?: TextStyle;
}

export function Title({ children, style }: TitleProps) {
  const { colors } = useTheme();
  return (
    <Text
      style={[
        { fontFamily: 'Nunito-ExtraBold', color: colors.text, fontSize: 16 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
