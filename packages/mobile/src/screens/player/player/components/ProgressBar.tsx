import moment from 'moment';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { useProgress } from 'react-track-player';
import Slider from '@react-native-community/slider';



export const Progress = () => {
  const { colors } = useTheme();
  const { duration, position } = useProgress();


  return (
    <View style={{ marginHorizontal: 12 }}>
      <View style={styles.view}>
        <Slider
          style={{ width: '100%', height: 40 }}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          minimumTrackTintColor={colors.primary}
          maximumTrackTintColor={colors.placeholder}
        />
      </View>
      <View style={styles.progressDetails}>
        <Text>{moment.utc(position).format("mm:ss")}</Text>
        <Text>{moment.utc(duration).format("mm:ss")}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  progressDetails: { flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 8, marginTop: 2 }
});
