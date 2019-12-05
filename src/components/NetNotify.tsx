import React from 'react';
import { Banner, IconButton } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import { useNetInfo } from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/core';

function NetNotify() {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  function checkNetInfo() {
    NetInfo.fetch().then(state => {
      console.log(state);
    });
  }

  return (
    <Banner
      visible={!netInfo.isConnected}
      actions={[
        {
          label: 'Retry',
          onPress: () => checkNetInfo(),
        },
        {
          label: 'Go offline',
          onPress: () => navigation.navigate('Offline'),
        },
      ]}
      image={({ size }) => (
        <IconButton
          icon="cloud-off"
          // size={size}
          // size={20}
        />
      )}
    >
      Your network is unavailable. Check your data or wifi connection.
    </Banner>
  );
}

export default NetNotify;
