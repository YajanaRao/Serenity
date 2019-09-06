import React from 'react';
import {withTheme, Button, Subheading} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';

const Blank = props => {
  const {colors} = props.theme;
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.background,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <FastImage
        source={require('../assets/tree.png')}
        style={[styles.icons, {backgroundColor: colors.background}]}
      />
      <Subheading>{props.text}</Subheading>
      <Button icon="refresh" mode="outlined" onPress={props.fetchData}>
        Refresh
      </Button>
    </View>
  );
};

export default withTheme(Blank);

const styles = StyleSheet.create({
  icons: {
    width: 209,
    height: 220,
    borderRadius: 4,
  },
});
