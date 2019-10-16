import React from 'react';
import PropTypes from 'prop-types';
import { Subheading, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import FastImage from 'react-native-fast-image';

const Tree = props => {
  const { colors } = props.theme;
  return (
    <View style={styles.container}>
      <FastImage
        source={require('../assets/tree.png')}
        style={[styles.icons, { backgroundColor: colors.background }]}
      />
      <Subheading>{props.message}</Subheading>
    </View>
  );
};

Tree.propTypes = {
  message: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withTheme(Tree);

const styles = StyleSheet.create({
  icons: {
    width: 209,
    height: 220,
    borderRadius: 4,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
});
