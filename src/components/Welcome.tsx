import React from 'react';
import { View } from 'react-native';

// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export const Welcome = () => (
  <View
    style={{
      alignItems: 'center',
      backgroundColor: '#00F260',
      flex: 1,
      justifyContent: 'center',
    }}
  >
    <Icon name="music" color="#ffffff" size={40} />
  </View>
);
