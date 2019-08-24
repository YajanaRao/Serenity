import React, { Component } from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { withNavigation } from "react-navigation";
import { connect } from "react-redux";
import { isEqual, isEmpty, isString } from "lodash";
import FastImage from "react-native-fast-image";
import { Surface, Subheading, Caption, IconButton } from "react-native-paper";

import {
  playTrack,
  pauseTrack,
  loadTrackPlayer,
  destroyTrackPlayer,
  setUpTrackPlayer
} from "../actions/playerState";

class MiniPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {}
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.active, state.active)) {
      props.loadTrackPlayer(props.active);
      return {
        active: props.active
      };
    }
    return null;
  }

  componentDidMount() {
    this.props.setUpTrackPlayer();
  }

  componentWillUnmount() {
    this.props.destroyTrackPlayer();
  }

  togglePlayback = () => {
    if (this.props.status == "playing") {
      this.props.pauseTrack();
    } else {
      this.props.playTrack();
    }
  };

  render() {
    const { navigate } = this.props.navigation;

    if (!isEmpty(this.state.active)) {
      return (
        <TouchableOpacity
          activeOpacity={0.9}
          style={{ height: 60, width: "100%" }}
          onPress={() => {
            navigate("Player");
          }}
        >
          <Surface style={styles.playBar}>
            {this.state.active.artwork &&
            isString(this.state.active.artwork) ? (
              <FastImage
                source={{ uri: this.state.active.artwork }}
                style={styles.artwork}
              />
            ) : (
              <FastImage
                source={require("../assets/note.png")}
                style={styles.artwork}
              />
            )}
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                marginLeft: 4
              }}
            >
              <Subheading numberOfLines={1} style={{ margin: 0 }}>
                {this.state.active.title}
              </Subheading>
              <Caption numberOfLines={1} style={{ margin: 0 }}>
                {this.state.active.artist
                  ? this.state.active.artist
                  : this.state.active.album}
              </Caption>
            </View>
            <View
              style={{
                justifyContent: "flex-end",
                alignItems: "center",
                width: 50
              }}
            >
              <IconButton
                icon={
                  this.props.status === "playing" ? "pause" : "play-arrow"
                }
                animated={true}
                size={34}
                onPress={() => this.togglePlayback()}
                style={{ margin: 0, padding: 0 }}
              />
            </View>
          </Surface>
        </TouchableOpacity>
      );
    } else {
      return false;
    }
  }
}

const mapStateToProps = state => ({
  active: state.playerState.active,
  status: state.playerState.status
});

export default connect(
  mapStateToProps,
  {
    playTrack,
    pauseTrack,
    loadTrackPlayer,
    destroyTrackPlayer,
    setUpTrackPlayer
  }
)(withNavigation(MiniPlayer));

const styles = StyleSheet.create({
  playBar: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    padding: 8,
    elevation: 0
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: "#d7d1c9"
  }
});
