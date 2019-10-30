import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';

const DefaultImage = ({ style }) => {
  return (
    <LinearGradient
      colors={['#11998e', '#38ef7d']}
      style={[style, { justifyContent: 'center', alignItems: 'center' }]}
    >
      <Icon name="music" color="#ffffff" size={style.height} />
    </LinearGradient>
  );
};

DefaultImage.propTypes = {
  style: PropTypes.object,
};

export default DefaultImage;
