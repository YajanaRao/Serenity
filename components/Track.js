import React, { Component } from 'react';
import { withTheme, Surface, List } from 'react-native-paper';
import { Image, StyleSheet, NativeModules, LayoutAnimation } from 'react-native';
import SwiperContainer from '../containers/SwiperContainer';
import { playMedia } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash'


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class Track extends Component {
    state = {
        hide: false
    }

    renderRightIcon = (props) => {
        const {
            track,
            active
        } = this.props;

        if (_.isEqual(active, track)) {
            const { colors } = this.props.theme;
            return <List.Icon {...props} icon="equalizer" color={colors.accent} />
        }
        return <List.Icon {...props} icon="favorite-border" />

    }
    // Playing a song is the song is not playing 
    play = () => {
        const {
            track,
            active
        } = this.props;
        if(active){
            if (_.isEqual(active, track.title)) {
                return false
            }
        }
        this.props.playMedia(track)
    }

    /*
        * Animation to remove an item from the list
        * may not be required for all render 
        * Adding duration would enhance the user experience
        * Testing has to be done
    */ 
    close = () => {
        LayoutAnimation.spring();
        this.setState({ hide: true })
    }

    render() {
        const {
            track
        } = this.props;

        if (this.state.hide && track) {
            return false
        }
        return (
            <SwiperContainer close={() => this.close()}>
                <Surface style={styles.surface}>
                    <List.Item
                        item={track}
                        title={track.title}
                        description={track.artist}
                        left={props => (
                            <Image {...props} source={{ uri: track.artwork }} style={styles.icons} />
                        )}
                        right={props => this.renderRightIcon(props)}
                        onPress={() => this.play()}
                    />
                </Surface>
            </SwiperContainer>
        );
    }
}

export default connect(null, { playMedia })(withTheme(Track));

const styles = StyleSheet.create(
    {
        icons: {
            width: 50,
            borderRadius: 2
        },
        surface: {
            padding: 0,
            margin: 0,
            borderRadius: 4
        }
    });