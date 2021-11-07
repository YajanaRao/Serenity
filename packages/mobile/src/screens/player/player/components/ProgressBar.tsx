import moment from 'moment';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useTheme, Text } from 'react-native-paper';
import { TrackPlayer } from 'react-track-player';

let SeekBar = ({ trackTintColor, thumbTintColor, value }: { trackTintColor: string, thumbTintColor: string, value: number }) => (
  <View style={{width: '100%'}}>
    <View style={{ backgroundColor: thumbTintColor, width: `${value.toFixed(0)}%`, height: 8, bottom: -8, borderTopLeftRadius: 2, borderBottomLeftRadius: 2 }} />
    <View style={{ backgroundColor: trackTintColor, height: 8, borderRadius: 2, opacity: 0.2, width: '100%' }} />
  </View>
)


export const Progress = () => {
  const { colors } = useTheme();
  const [duration, setDuration] = React.useState(0);
  const [position, setPosition] = React.useState('00:00');
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    TrackPlayer.getDuration().then((end: number) => {
      setDuration(end)  
    })
    const poll = setInterval(getProgress, 1000)
    return () => clearInterval(poll)
  }, [])

  function getProgress() {
    TrackPlayer.getPosition().then((start: number) => {
      const startTime = moment.utc(start).format("mm:ss");
      const progress = start / duration * 100;
      console.log(progress)
      setPosition(startTime);
      setProgress(progress);
    })
  }


  return (
    <View style={{marginHorizontal: 12}}>
      <View style={styles.view}>
        <SeekBar
          value={progress}
          thumbTintColor={colors.primary}
          trackTintColor={colors.primary}
        />
      </View>
      <View style={styles.progressDetails}>
        <Text>{position}</Text>
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
  progressDetails: {  flexDirection: "row", justifyContent: 'space-between', marginHorizontal: 2, marginTop: 2 }
});
