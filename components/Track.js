import React, { Component } from 'react';
import { withTheme, List } from 'react-native-paper';
import { StyleSheet, NativeModules, LayoutAnimation, View } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import SwiperContainer from '../containers/SwiperContainer';
import { playMedia, addToQueue } from '../actions';


const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
    UIManager.setLayoutAnimationEnabledExperimental(true);

class Track extends Component {
    state = {
        hide: false,
        open: false
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
        // return <Love track={track} />
        // return <List.Icon {...props} icon="more-vert" onPress={() => this.setState({ open: true })} />
        return false;
    }
    // Playing a song is the song is not playing 
    play = () => {
        const {
            track,
            active
        } = this.props;
        if(active){
            if (_.isEqual(active, track)) {
                return false
            }
        }
        this.props.playMedia(track);
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

        const { colors } = this.props.theme;
        
        if (this.state.hide && track) {
            return false
        }

        return (
            <SwiperContainer close={() => this.close()}>
                <View style={[styles.surface, { backgroundColor: colors.background }]}>
                    <List.Item
                        item={track}
                        title={track.title}
                        description={ track.artist ? track.artist : track.album }
                        // left={props => (
                        //     <FastImage {...props} source={{ uri: track.artwork }} style={styles.icons} />
                        // )}
                        right={props => this.renderRightIcon(props)}
                        onPress={() => this.play()}
                    />
                </View>
            </SwiperContainer>
        );
        
    }
}

const mapStateToProps = state => ({
    active: state.media.active
});

export default connect(mapStateToProps, { playMedia, addToQueue })(withTheme(Track));

const styles = StyleSheet.create(
    {
        icons: {
            width: 50,
            borderRadius: 4
        },
        surface: {
            padding: 0,
            margin: 0,
            borderRadius: 4
        }
    });