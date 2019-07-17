import React, { Component } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';
import { Surface, ActivityIndicator, Subheading, Caption, IconButton } from 'react-native-paper';

import { playTrack, pauseTrack } from '../actions/playerState';



class MiniPlayer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: {},
            status: "init"
        }
    }


    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.active, state.active)) {
            return {
                active: props.active
            }
        }
        if (!_.isEqual(props.status, state.status)) {
            return {
                status: props.status
            }
        }
        return null
    }


    togglePlayback = () => {
        if (this.state.status == "playing") {
            this.props.pauseTrack()
        } else {
            this.props.playTrack();
        }
    }

    render() {
        const { navigate } = this.props.navigation;

        if (!_.isEmpty(this.state.active)) {
            return (
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ height: 60, width: '100%' }}
                    onPress={() => {
                        navigate('Player')
                    }}>
                    <Surface style={styles.playbar}>
                        {this.state.active.artwork && _.isString(this.state.active.artwork) ?
                            <FastImage
                                source={{ uri: this.state.active.artwork }}
                                style={{ width: 50, height: 50, borderRadius: 4 }}
                            />
                            :
                            <FastImage
                                source={require('../assets/app-icon.png')}
                                style={{ width: 50, height: 50, borderRadius: 4 }}
                            />
                        }
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 4 }}>
                            <Subheading numberOfLines={1} style={{ margin: 0 }}>{this.state.active.title}</Subheading>
                            <Caption numberOfLines={1} style={{ margin: 0 }}>{this.state.active.artist ? this.state.active.artist : this.state.active.album}</Caption>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50 }}>
                            {this.state.status == "loading" ?
                                <ActivityIndicator animating={true} />
                                :
                                <IconButton
                                    icon={this.state.status == "playing" ? "pause" : "play-arrow"}
                                    animated={true}
                                    size={34}
                                    onPress={this.togglePlayback}
                                    style={{ margin: 0, padding: 0 }}
                                />
                            }
                        </View>
                    </Surface>
                </TouchableOpacity>
            );
        }
        else {
            return false
        }
       
    }
}

const mapStateToProps = state => ({
    active: state.playerState.active,
    status: state.playerState.status
});


export default connect(mapStateToProps, {
    playTrack,
    pauseTrack
})(withNavigation(MiniPlayer));


const styles = StyleSheet.create({
    playbar: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8,
        elevation: 0
    }
})