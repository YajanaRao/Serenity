import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';

export interface SpinnerProps {
  size?: 'small' | 'large'
}

export function Spinner({ size = 'small' }: SpinnerProps) {
  return (
    <ActivityIndicator size={size} color="#1DB954" />
  );
}
