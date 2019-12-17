import React from 'react';
import { View, ViewStyle } from 'react-native';

// @ts-ignore
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CONTAINER: ViewStyle = {
  alignItems: 'center',
  backgroundColor: '#00F260',
  flex: 1,
  justifyContent: 'center',
};

export const Welcome = () => (
  <View style={CONTAINER}>
    <Icon name="music" color="#ffffff" size={40} />
  </View>
);
