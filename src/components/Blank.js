import React from 'react';
import {withTheme, Button} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import Tree from './Tree';

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
      <Tree message={props.text} />
      <View>
        <Button icon="refresh" mode="outlined" onPress={props.fetchData}>
          Refresh
        </Button>
      </View>
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
