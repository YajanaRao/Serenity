import React, { Component } from 'react';
import { View, ScrollView, TouchableOpacity, StyleSheet } from "react-native";
import Modal from 'react-native-modal';
import { Subheading, FAB, withTheme, ActivityIndicator, IconButton, Title, Divider } from 'react-native-paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import { FlatList } from 'react-native-gesture-handler';
import TrackPlayer from 'react-native-track-player';
import FastImage from 'react-native-fast-image';

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
            isMounted: false,
            modalVisible: false
        }
    }


    componentDidMount() {
        if(!this.state.isMounted){
            TrackPlayer.setupPlayer({}).then(() => {
                TrackPlayer.updateOptions({
                    stopWithApp: true,
                    capabilities: [
                        TrackPlayer.CAPABILITY_PLAY,
                        TrackPlayer.CAPABILITY_PAUSE,
                        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
                        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
                        TrackPlayer.CAPABILITY_SKIP
                    ]
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

            this.setState({
                isMounted: true
            })


        }
        
    }

    componentWillUnmount() {
        if(this.state.isMounted) {
            this._onStateChanged.remove();
            this._onTrackChanged.remove();
            TrackPlayer.destroy();
            this.setState({
                isMounted: false
            })
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.queue) {
            this.setState({
                queue: nextProps.queue
            })
        }
        if(nextProps.active) {
            this.setState({
                active: nextProps.active,
                isMounted: true
            })
        }
    }

    updateTrackStatus = (data) => {
        if(this.state.isMounted){
            if (data) {
                if (data.state == 3) {
                    this.setState({
                        isPlaying: true,
                        isLoading: false
                    })
                }
                else if (data.state == 2) {
                    this.setState({
                        isPlaying: false,
                        isLoading: false
                    })
                }
                else if (data.state == 6) {
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
                    TrackPlayer.getCurrentTrack().then((currentTrack) => {
                        if (currentTrack == null) {
                            TrackPlayer.reset();
                            this.setState({
                                isMounted: false
                            })
                        } else {
                            this.skipToNext();
                        }
                    })

                }
            }
        }
    }

    skipToNext = () => {
        try {
            TrackPlayer.skipToNext().then(() => {
                TrackPlayer.play();
            })
            .catch((error) => {
                console.log(error)
            })
        } catch (error) {
            console.log(error);
            TrackPlayer.stop();
        }
    }

    skipToPrevious = () => {
        try {
            TrackPlayer.skipToPrevious().then(() => {
                TrackPlayer.play();
            });
        } catch (error) {
            console.log(error);
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

    handleOnScroll = event => {
        this.setState({
            scrollOffset: event.nativeEvent.contentOffset.y,
        });
    };

    handleScrollTo = p => {
        if (this.scrollViewRef) {
            this.scrollViewRef.scrollTo(p);
        }
    };

    render() {

        const { colors } = this.props.theme;

        if(!_.isEmpty(this.state.active) && this.state.isMounted){
            return (
                <View>
                    <Modal
                        propagateSwipe
                        isVisible={this.state.modalVisible}
                        coverScreen={true}
                        swipeDirection="down"
                        onSwipeComplete={() => this.setModalVisible(false)}
                        useNativeDriver={true}
                        scrollTo={this.handleScrollTo}
                        scrollOffset={this.state.scrollOffset}
                        style={{ margin: 0 }}
                        scrollOffsetMax={400 - 300} // content height - ScrollView height
                        useNativeDriver={true}
						hideModalContentWhileAnimating={true}
                   >
                    <ScrollView 
                        style={{ flex: 1, backgroundColor: colors.background }}
                        ref={ref => (this.scrollViewRef = ref)}
                        onScroll={this.handleOnScroll}
                        scrollEventThrottle={16}
                    >
                        <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', zIndex: 1 }}>
                            <IconButton
                                icon="close"
                                // size={20}
                                onPress={() => this.setModalVisible(false)}
                            />
                            <IconButton
                                icon="more-vert"
                                // size={20}
                                onPress={() => this.setModalVisible(false)}
                            />

                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            {/* <Card.Cover source={ this.state.img } style={{ width: 250, height: 250, borderRadius: 4 }} /> */}
                                <FastImage source={{ uri: this.state.active.artwork }} style={{ width: 250, height: 250, borderRadius: 4 }} />
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 8 }}>
                            <Love />
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Title numberOfLines={1}>{this.state.active.title}</Title>
                                <Subheading numberOfLines={1}>{this.state.active.artist}</Subheading>
                            </View>

                            <IconButton
                                icon="more-vert"
                                // size={20}
                                onPress={() => console.log("pressed")}
                            />
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
                            {this.state.isLoading ?
                                <ActivityIndicator animating={true} />
                                :
                                <FAB
                                    icon={this.state.isPlaying ? "pause" : "play-arrow"}
                                    onPress={this.togglePlayback}
                                />
                            }
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
                            renderItem={({ item }) => <Track track={item} />}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <View style={{ height: 100 }} />
                    </ScrollView>
                </Modal>
                <TouchableOpacity
                    activeOpacity={0.9}
                    style={{ zIndex: 10, position: 'absolute', height: 60, width: '100%', bottom: 0 }}
                    onPress={() => {
                        this.setModalVisible(true);
                    }}>
                    <View style={[styles.playbar, { backgroundColor: colors.surface }]}>
                            {this.state.active.artwork ? <FastImage source={{ uri: this.state.active.artwork }} style={{ width: 50, height: 50, borderRadius: 4 }} /> : false }
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Subheading numberOfLines={1}>{this.state.active.title}</Subheading>
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
        elevation: 8
    },
    container: {
        justifyContent: 'center', 
        alignItems: 'center'
    }
})
