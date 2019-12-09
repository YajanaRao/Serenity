import React from 'react';
import { Banner, IconButton } from 'react-native-paper';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';

export function NetNotify() {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  return (
    <Banner
      visible={!netInfo.isConnected}
      actions={[
        {
          label: 'Go offline',
          onPress: () => navigation.navigate('Offline'),
        },
      ]}
      image={({ size }: { size: number }) => (
        <IconButton icon="cloud-off" size={size} />
      )}
    >
      Your network is unavailable. Check your data or wifi connection.
    </Banner>
  );
}
