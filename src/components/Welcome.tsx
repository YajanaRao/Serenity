import React from 'react';
import { View } from 'react-native';

// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Welcome = () => (
  <View
    style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00F260',
    }}
  >
    <Icon name="music" color="#ffffff" size={40} />
  </View>
);
