import React from 'react';
import { Surface, Text, useTheme } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';

export const NetInfoBar = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const { colors } = useTheme();

    if(!netInfo.isConnected) {
      return (
          <Surface style={{ backgroundColor: colors.onSurface }}>
              <Text style={{ paddingHorizontal: 12, paddingVertical: 1, color: colors.surface, textAlign: "center" }}>No Internect connection available</Text>
          </Surface>
    );

    }
    return null;

}
