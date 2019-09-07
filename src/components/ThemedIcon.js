import React from 'react';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {withTheme} from 'react-native-paper';

const ThemedIcon = props => {
  const {colors} = props.theme;
  return <Icon name={props.name} color={colors.text} size={props.size} />;
};

ThemedIcon.propTypes = {
  name: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  theme: PropTypes.object,
};

export default withTheme(ThemedIcon);
