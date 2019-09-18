import React from 'react';
import { withTheme } from 'react-native-paper';
import { View, StyleSheet, Slider } from 'react-native';
import { ProgressBar } from 'react-native-audio';

const Progress = ({status}) => {
  return (
    <View style={styles.view}>
      <ProgressBar style={styles.bar} status={status} />
      {/* <Slider
        style={{width: 200, height: 40}}
        minimumValue={0}
        maximumValue={1}
        minimumTrackTintColor="#FFFFFF"
        maximumTrackTintColor="#000000"
      /> */}
    </View>
  );
};

export default withTheme(Progress);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%'
  },
  info: {
    margin: 4,
  },
  bar: {
    height: 30,
    width: '100%',
    margin: 10
  }
});
