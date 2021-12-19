import React from 'react';
import { TextStyle, Text, Platform } from 'react-native';
import { useTheme } from 'react-native-paper';

export interface TitleProps {
  children: React.ReactChild | React.ReactChild[];
  style?: TextStyle;
}

export function Title({ children, style }: TitleProps) {
  const { colors } = useTheme();

  const fontFamily = Platform.OS === 'web' ? 'Nunito' : 'Nunito-ExtraBold';
  return (
    <Text
      style={[
        { fontFamily, color: colors.text, fontSize: 16 },
        style,
      ]}
    >
      {children}
    </Text>
  );
}
