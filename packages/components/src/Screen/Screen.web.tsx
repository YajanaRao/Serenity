import React, { ReactNode } from 'react';
import { useTheme } from 'react-native-paper';

interface ScreenProps {
  children: ReactNode;
}

const Screen = ({ children }: ScreenProps) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <div
      style={{ backgroundColor: colors.background }}
    >
      <div style={{ height: '100vh' }} className="screen">
        {children}
      </div>
    </div>
  );
};

export default Screen;
