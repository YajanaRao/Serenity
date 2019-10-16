import React from 'react';
import { Button, withTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Tree from './Tree';

const Blank = props => {
  const { colors } = props.theme;
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Tree message={props.text} />
      <View style={styles.padding}>
        <Button icon="refresh" mode="text" onPress={props.fetchData}>
          Refresh
        </Button>
      </View>
    </View>
  );
};

export default withTheme(Blank);

Blank.propTypes = {
  theme: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  padding: {
    margin: 4,
  },
});
