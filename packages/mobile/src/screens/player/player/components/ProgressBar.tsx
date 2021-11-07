import moment from 'moment';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { ProgressBar, TrackPlayer } from 'react-track-player';

export const Progress = () => {
  const { colors } = useTheme();
  const [duration, setDuration] = React.useState('00:00');
  const [position, setPosition] = React.useState('00:00');

  React.useEffect(() => {
    TrackPlayer.getDuration().then((end: number) => {
      const endTime = moment.utc(end).format("mm:ss");
      setDuration(endTime)  
    })
    const poll = setInterval(getProgress, 1000)
    return () => clearInterval(poll)
  }, [])

  function getProgress() {
    TrackPlayer.getPosition().then((start: number) => {
      const startTime = moment.utc(start).format("mm:ss");
      setPosition(startTime)
    })
  }


  return (
    <View >
      <View style={styles.view}>
        <ProgressBar
          style={styles.bar}
          thumbTintColor={colors.primary}
          trackTintColor={colors.primary}
        />
      </View>
      <View style={styles.progressDetails}>
        <Text>{position}</Text>
        <Text>{duration}</Text>
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
  bar: {
    height: 30,
    width: '100%',
  },
  progressDetails: {  flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 20 }
});
