import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types'


const DefaultImage = props => {
  return (
    <LinearGradient colors={['#11998e', '#38ef7d']} style={props.style}>
      <Icon name="music" color="#ffffff" size={props.style.height} />
    </LinearGradient>
  );
};

DefaultImage.propTypes = {
  style: PropTypes.object,
};

export default DefaultImage;
