import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, RefreshControl } from "react-native";
import { Subheading, FAB, withTheme, IconButton, Title, Divider, Surface } from 'react-native-paper';
import isString from 'lodash/isString';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { SwipeListView } from 'react-native-swipe-list-view';

import Track from '../../components/Track';
import Love from '../../components/Love';
// import ProgressBar from '../../components/ProgressBar';
import Lyric from '../../components/Lyric';

import {
    playTrack,
    clearQueue,
    skipToNext,
    skipToPrevious,
    pauseTrack,
    removeFromQueue,
    getQueue,
    getTrackStatus
} from '../../actions/playerState';

class Player extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: {},
            status: "init",
            queue: [],
            refreshing: false
        }
    }

    togglePlayback = () => {
        if (this.props.status == "playing") {
            this.props.pauseTrack()
        } else {
            this.props.playTrack();
        }
    }

    clearPlaylist = () => {
        this.props.clearQueue();
        this.setState({
            queue: [],
            active: {}
        })
        this.props.navigation.goBack();
    }

    fetchData = () => {
        this.setState({
            refreshing: true
        })
        this.props.getQueue();
        this.setState({
            refreshing: false
        })
    }

    render() {

        const { colors } = this.props.theme;

        return (
          <View style={{ backgroundColor: colors.background, flex: 1 }}>
            <ScrollView
              refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={() => this.fetchData()}
                />
              }
            >
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                  alignItems: "center",
                  zIndex: 1
                }}
              >
                <IconButton
                  icon="close"
                  onPress={() => this.props.navigation.goBack()}
                />
                {/* <IconButton
                            icon="more-vert"
                            onPress={() => this.props.navigation.goBack()}
                        /> */}
              </View>
              <View
                style={{
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                {this.state.active.artwork &&
                isString(this.props.active.artwork) ? (
                  <FastImage
                    source={{ uri: this.props.active.artwork }}
                    style={{
                      width: 250,
                      height: 250,
                      borderRadius: 4,
                      backgroundColor: colors.primary
                    }}
                  />
                ) : (
                  <FastImage
                    source={require("../../assets/app-icon.png")}
                    style={{ width: 250, height: 250, borderRadius: 4 }}
                  />
                )}
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <View
                  style={{
                    justifyContent: "center",
                    alignItems: "center",
                    flex: 1
                  }}
                >
                  <Title numberOfLines={1}>
                    {this.props.active.title}
                  </Title>
                  <Subheading numberOfLines={1}>
                    {this.props.active.artist
                      ? this.props.active.artist
                      : this.props.active.album}
                  </Subheading>
                </View>
              </View>
              {/* <View style={{ alignItems: 'center', justifyContent: 'center', margin: 16 }}>
                        <ProgressBar />
                    </View> */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-around",
                  alignItems: "center",
                  margin: 12
                }}
              >
                <IconButton
                  icon="skip-previous"
                  size={40}
                  onPress={this.props.skipToPrevious}
                />
                <IconButton
                  icon={
                    this.props.status === "playing"
                      ? "pause"
                      : "play-arrow"
                  }
                  animated={true}
                  size={34}
                  onPress={() => this.togglePlayback()}
                  style={{ margin: 0, padding: 0 }}
                />
                <IconButton
                  icon="skip-next"
                  size={40}
                  onPress={this.props.skipToNext}
                />
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  flex: 1
                }}
              >
                <Love style={{ width: 60 }} track={this.props.active} />
                {/* <Lyric style={{ width: 60 }} track={this.props.active} /> */}
                <View style={{ width: 60 }}>
                  <IconButton
                    icon="repeat"
                    // size={20}
                    onPress={() => console.log("pressed")}
                  />
                </View>
              </View>
              <Divider />
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between"
                }}
              >
                <Title style={{ padding: 10 }}>Queue</Title>
                <IconButton
                  icon="delete"
                  // size={40}
                  onPress={this.clearPlaylist}
                />
              </View>

              <Divider />
              <SwipeListView
                data={this.props.queue}
                renderItem={({ item }) => <Track track={item} />}
                ItemSeparatorComponent={() => <Divider inset={true} />}
                keyExtractor={(item, index) => index.toString()}
                renderHiddenItem={({ item }) => (
                  <Surface style={styles.rowBack}>
                    <IconButton
                      icon="delete"
                      color={colors.error}
                      onPress={() => this.props.removeFromQueue(item)}
                    />
                    <Love track={this.props.active} />
                  </Surface>
                )}
                leftOpenValue={75}
                rightOpenValue={-75}
                closeOnRowPress={true}
                closeOnRowOpen={true}
                useNativeDriver={true}
              />
              <View style={{ height: 100 }} />
            </ScrollView>
          </View>
        );
    }
}



const mapStateToProps = state => ({
    queue: state.playerState.queue,
    active: state.playerState.active,
    status: state.playerState.status
});

export default connect(mapStateToProps, { 
    playTrack, 
    pauseTrack, 
    clearQueue, 
    skipToNext, 
    skipToPrevious, 
    removeFromQueue,
    getQueue,
    getTrackStatus
})(withTheme(Player));

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
    },
    rowBack: {
        alignItems: 'center',
        // backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
        paddingRight: 15
    },
})