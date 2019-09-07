import React from 'react';
import PropTypes from 'prop-types';
import {Button, Subheading, withTheme} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';


const Tree = props => {
    const { colors } = props.theme;
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <FastImage
          source={require('../assets/tree.png')}
          style={[styles.icons, {backgroundColor: colors.background}]}
        />
        <Subheading>{props.message}</Subheading>
        <View>
          <Button icon="refresh" mode="outlined" onPress={props.fetchData}>
            Refresh
          </Button>
        </View>
      </View>
    );
};

Tree.propTypes = {
    message: PropTypes.string.isRequired,
};

export default withTheme(Tree);

const styles = StyleSheet.create({
  icons: {
    width: 209,
    height: 220,
    borderRadius: 4,
  },
});

