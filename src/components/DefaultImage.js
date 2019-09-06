import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import FastImage from 'react-native-fast-image';

const DefaultImage = props => {
  return (
    <LinearGradient
      colors={['#00B4DB', '#0083B0']}
      style={props.style}>
      <FastImage source={require('../assets/note.png')} style={props.style} />
    </LinearGradient>
  );
};

export default DefaultImage;
