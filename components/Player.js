import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet, Modal } from "react-native";
import { Subheading, FAB, withTheme, ActivityIndicator, IconButton, Title, Divider, Paragraph, Caption } from 'react-native-paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import FastImage from 'react-native-fast-image';
import RNMediaMetadataRetriever from 'react-native-media-metadata-retriever'

import { playMedia, clearQueue, activeTrackUpdate } from '../actions';
import Track from './Track';
import Love from './Love';
import ProgressBar from './ProgressBar';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: {},
            isLoading: false,
            queue: [],
            isPlaying: false,
            modalVisible: false
        }
        // this._onInitialLoad();
    }


    componentDidMount() {
        TrackPlayer.setupPlayer({}).then(() => {
            TrackPlayer.updateOptions({
                stopWithApp: true,
                capabilities: [
                    TrackPlayer.CAPABILITY_PLAY,
                    TrackPlayer.CAPABILITY_PAUSE,
                    TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                    TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                    TrackPlayer.CAPABILITY_SKIP
                ],
            });
        })
        this._onStateChanged = TrackPlayer.addEventListener('playback-state', async (data) => {
            requestAnimationFrame(() => {
                this.updateTrackStatus(data);
            })
        });

        this._onTrackChanged = TrackPlayer.addEventListener('playback-track-changed', async (data) => {
            if (data.nextTrack) {
                this.props.activeTrackUpdate(data.nextTrack);
            }
        })

        this._onInitialLoad();
    }

    _onInitialLoad =  () => {
        // console.log("has to be only once")
        if(!_.isEmpty(this.state.queue)){
            TrackPlayer.add(this.state.queue).then(() => {
                if(!_.isEmpty(this.state.active)){
                    // console.log(this.state.active)
                    TrackPlayer.skip(this.state.active.id);
                }
            })
        }
    }

    componentWillUnmount() {
        this._onStateChanged.remove();
        this._onTrackChanged.remove();
        TrackPlayer.destroy();
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.queue, state.queue)) {
            return {
                queue: props.queue
            }
        }
        if (!_.isEqual(props.active, state.active)) {
            return {
                active: props.active
            }
        }
        return null
    }


    updateTrackStatus = (data) => {
        if (data.state == TrackPlayer.STATE_PLAYING) {
            this.setState({
                isPlaying: true,
                isLoading: false
            })
        }
        else if (data.state == TrackPlayer.STATE_BUFFERING) {
            this.setState({
                isLoading: true,
                isPlaying: false
            })
        }
        else {
            this.setState({
                isPlaying: false,
                isLoading: false
            })
        }
    }

    skipToNext = () => {
        try {
            TrackPlayer.skipToNext().then(() => {
                TrackPlayer.play();
            })
        } catch (error) {
            // console.log(error);
            TrackPlayer.stop();
        }
    }

    skipToPrevious = () => {
        try {
            TrackPlayer.skipToPrevious().then(() => {
                TrackPlayer.play();
            });
        } catch (error) {
            // console.log(error);
            TrackPlayer.stop();
        }
        
    }

    

    togglePlayback = () => {
        TrackPlayer.getCurrentTrack().then((currentTrack) => {
            if (currentTrack == null) {
                TrackPlayer.reset();
            } else {
                if (!this.state.isPlaying) {
                    TrackPlayer.play();
                } else {
                    TrackPlayer.pause();
                }
            }
        })
    }


    setModalVisible(visible) {
        this.setState({ modalVisible: visible });
    }

    clearPlaylist = () => {
        this.props.clearQueue();
        this.setState({
            queue: [],
            modalVisible: false,
            img: null,
            title: null,
            artist: null,
            id: null
        })
    }

    render() {

        const { colors } = this.props.theme;
        
        if(!_.isEmpty(this.state.active)){
            return (
                <View>
                    <Modal
                        animationType="slide"
                        transparent={false}
                        visible={this.state.modalVisible}
                        onRequestClose={() => {
                            this.setModalVisible(false);
                        }}
                        coverScreen={true}
                        onDismiss={() => this.setModalVisible(false)}
                        presentationStyle="fullScreen"
                   >
                    <ScrollView style={{ backgroundColor: colors.background }}>
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', zIndex: 1 }}>
                            <IconButton
                                icon="close"
                                onPress={() => this.setModalVisible(false)}
                            />
                            <IconButton
                                icon="more-vert"
                                onPress={() => this.setModalVisible(false)}
                            />

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                {this.state.active.artwork && _.isString(this.state.active.artwork) ? 
                                    <FastImage 
                                        source={{ uri: this.state.active.artwork }} 
                                        style={{ width: 250, height: 250, borderRadius: 4, backgroundColor: colors.primary }} />
                                    :
                                    <FastImage 
                                        source={ require('../assets/app-icon.png') }
                                        style={{ width: 250, height: 250, borderRadius: 4 }} />
                            } 
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', flex: 1 }}>
                            <Love style={{ width: 60 }} track={this.state.active}/>
                            <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1 }}>
                                <Title numberOfLines={1}>{this.state.active.title}</Title>
                                    <Subheading numberOfLines={1}>{this.state.active.artist ? this.state.active.artist : this.state.active.album }</Subheading>
                            </View>

                           <View style={{ width: 60 }}>
                                <IconButton
                                    icon="repeat"
                                    // size={20}
                                    onPress={() => console.log("pressed")}
                                />
                           </View>
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 16 }}>
                            <ProgressBar />  
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', margin: 12 }}>
                            <IconButton
                                icon="skip-previous"
                                size={40}
                                onPress={this.skipToPrevious}
                            />
                           
                            <FAB
                                loading={this.state.isLoading}
                                icon={this.state.isPlaying ? "pause" : "play-arrow"}
                                onPress={this.togglePlayback}
                            />
                            
                            <IconButton
                                icon="skip-next"
                                size={40}
                                onPress={this.skipToNext}
                            />
                        </View>
                        <Divider />
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                <Title style={{ padding: 10 }}>Queue</Title>
                                <IconButton
                                    icon="delete"
                                    // size={40}
                                    onPress={this.clearPlaylist}
                                />
                        </View>
                        
                        <Divider />
                        <FlatList
                            data={this.state.queue}
                            renderItem={({ item }) => <Track track={item} swipeable={true} leftAction={true} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </Modal>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{  height: 60, width: '100%' }}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <View style={[styles.playbar, { backgroundColor: colors.surface }]}>
                            {this.state.active.artwork && _.isString(this.state.active.artwork) ?
                                <FastImage 
                                    source={{ uri: this.state.active.artwork }} 
                                    style={{ width: 50, height: 50, borderRadius: 4, backgroundColor: colors.primary }} 
                                /> 
                                : 
                                <FastImage
                                    source={require('../assets/app-icon.png')} 
                                    style={{ width: 50, height: 50, borderRadius: 4 }}
                                />
                            }
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginLeft: 4 }}>
                            <Subheading numberOfLines={1} style={{ margin: 0 }}>{this.state.active.title}</Subheading>
                                <Caption numberOfLines={1} style={{ margin: 0 }}>{this.state.active.artist ? this.state.active.artist : this.state.active.album }</Caption>
                        </View>
                        <View style={{ justifyContent: 'flex-end', alignItems: 'center', width: 50 }}>
                            {this.state.isLoading ?
                                <ActivityIndicator animating={true} />
                                :      
                                <IconButton
                                    icon={this.state.isPlaying ? "pause" : "play-arrow"}
                                    animated={true}
                                    size={34}
                                    onPress={this.togglePlayback}
                                    style={{ margin: 0, padding: 0 }}
                                />
                            }
                        </View>
                    </View>
                </TouchableOpacity>
            </View>
            );
        }
        else {
            return false
        }
    }
}



const mapStateToProps = state => ({
    queue: state.media.queue,
    active: state.media.active
});

export default connect(mapStateToProps, { playMedia, clearQueue, activeTrackUpdate })(withTheme(Player));

const styles = StyleSheet.create({
    playbar: {
        flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        padding: 8,
        elevation: 0
    },
    container: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
