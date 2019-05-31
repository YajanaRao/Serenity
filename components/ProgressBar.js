import React from 'react';
import { withTheme, Caption, ProgressBar } from "react-native-paper";
import { View, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { ProgressComponent } from 'react-native-track-player';


class Progress extends ProgressComponent {

    formatTime = (seconds) => {
        const ss = Math.floor(seconds) % 60;
        const mm = Math.floor(seconds / 60) % 60;
        const hh = Math.floor(seconds / 3600);

        if (hh > 0) {
            return hh + ':' + this.formatTwoDigits(mm) + ':' + this.formatTwoDigits(ss);
        } else {
            return mm + ':' + this.formatTwoDigits(ss);
        }
    }

    formatTwoDigits = (n) => {
        return n < 10 ? '0' + n : n;
    }

    render() {

        // const { colors } = this.props.theme
        const position = this.formatTime(Math.floor(this.state.position));
        const duration = this.formatTime(Math.floor(this.state.duration));
        const info = position + ' / ' + duration;
        // let progress = this.getProgress() * 100;
        // let buffered = this.getBufferedProgress() * 100;
        // buffered -= progress;
        // if (buffered < 0) buffered = 0;

        return (
            <View style={styles.view}>
                {/* <TouchableWithoutFeedback>
                    <Surface style={styles.bar}>
                        <View style={[{ width: progress + '%', backgroundColor:  colors.primary }, styles.played]} />
                        <View style={[{ width: buffered + '%', backgroundColor: colors.accent }, styles.buffered]} />
                    </Surface>
                </TouchableWithoutFeedback> */}
                <ProgressBar progress={this.getProgress()} style={{ width: 300 }} />
                <Caption style={styles.info}>{info}</Caption>
            </View>
        );
    }

}

export default withTheme(Progress)

const styles = StyleSheet.create({
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        width: '100%'
    },
    info: {
        margin: 4
    },
    bar: {
        height: 5,
        width: '100%',
        margin: 10,
        flexDirection: 'row',
        alignItems: 'flex-start'
    },
    played: {
        height: 5
    },
    buffered: {
        height: 5
    }
})
