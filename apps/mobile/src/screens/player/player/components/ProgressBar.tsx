import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useTheme, Text} from 'react-native-paper';
import {TrackPlayer, useProgress} from 'react-track-player';
import Slider from '@react-native-community/slider';

function millisToMinutesAndSeconds(millis) {
	var minutes = Math.floor(millis / 60000);
	var seconds = ((millis % 60000) / 1000).toFixed(0);
	return seconds == 60
		? minutes + 1 + ':00'
		: minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export const Progress = () => {
	const {colors} = useTheme();
	const {duration, position} = useProgress();
	const [seekValue, setSeekValue] = React.useState();
	const [isSeeking, setSeeking] = React.useState(false);

	const getPosition = () => {
		let seconds;
		if (isSeeking) {
			seconds = seekValue;
		} else {
			seconds = position;
		}
		return millisToMinutesAndSeconds(seconds);
	};
	return (
		<View style={{marginHorizontal: 12}}>
			<View style={styles.view}>
				<Slider
					style={{width: '100%', height: 40}}
					minimumValue={0}
					maximumValue={duration}
					value={position}
					minimumTrackTintColor={colors.primary}
					maximumTrackTintColor={colors.placeholder}
					onSlidingStart={() => setSeeking(true)}
					onValueChange={value => setSeekValue(value)}
					onSlidingComplete={value => {
						TrackPlayer.pause();
						TrackPlayer.seekTo(value);
						TrackPlayer.play();
						setSeeking(false);
					}}
				/>
			</View>
			<View style={styles.progressDetails}>
				<Text>{getPosition()}</Text>
				<Text>{millisToMinutesAndSeconds(duration)}</Text>
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
	progressDetails: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 8,
		marginTop: 2,
	},
});
