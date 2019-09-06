import React from 'react';
import {withTheme, Caption, ProgressBar} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';
import {useTrackPlayerProgress} from 'react-native-track-player';

function formatTwoDigits(n) {
  return n < 10 ? '0' + n : n;
}

function formatTime(seconds) {
  if (seconds) {
    const ss = Math.floor(seconds) % 60;
    const mm = Math.floor(seconds / 60) % 60;
    const hh = Math.floor(seconds / 3600);

    if (hh > 0) {
      return hh + ':' + formatTwoDigits(mm) + ':' + formatTwoDigits(ss);
    } else {
      return mm + ':' + formatTwoDigits(ss);
    }
  }
  return '0:00';
}

function Progress() {
  const progress = useTrackPlayerProgress();
  const position = formatTime(Math.floor(progress.position));
  const duration = formatTime(Math.floor(progress.duration));
  const info = position + ' / ' + duration;
  const prog = parseInt(progress.position) / parseInt(progress.duration);
  return (
    <View style={styles.view}>
      <ProgressBar progress={prog ? prog : 0} style={{width: 300}} />
      <Caption style={styles.info}>{info}</Caption>
    </View>
  );
}

// class Progress extends React.Component {

//     render() {
//         const progress = useTrackPlayerProgress();
//         const position = this.formatTime(Math.floor(this.state.position));
//         const duration = this.formatTime(Math.floor(this.state.duration));
//         const info = position + ' / ' + duration;

//         return (
//             <View style={styles.view}>
//                 <ProgressBar progress={this.getProgress()} style={{ width: 300 }} />
//                 <Caption style={styles.info}>{info}</Caption>
//             </View>
//         );
//     }

// }

export default withTheme(Progress);

const styles = StyleSheet.create({
  view: {
    flexDirection: 'column',
    alignItems: 'center',
    flex: 1,
    width: '100%',
  },
  info: {
    margin: 4,
  },
  bar: {
    height: 5,
    width: '100%',
    margin: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  played: {
    height: 5,
  },
  buffered: {
    height: 5,
  },
});
