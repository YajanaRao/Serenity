import React, { PureComponent } from "react";
import { withTheme, Title, Paragraph } from "react-native-paper";
import { StyleSheet, View, FlatList, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import isEmpty from "lodash/isEmpty";
import FastImage from "react-native-fast-image";

import { loadTrackPlayer, playTrack } from "../actions/playerState";

// FIXME: Testing the application
class Recent extends PureComponent {
  play = (track) => {
    if (!isEmpty(track)) {
      this.props.loadTrackPlayer(track);
      this.props.playTrack();
    }
  };

  render() {
    if (this.props.history) {
      return (
        <View style={styles.surface}>
          <Title style={styles.title}>Recent songs</Title>
          <FlatList
            horizontal={true}
            data={this.props.history}
            keyExtractor={(item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) =>
              item ? (
                <TouchableOpacity
                  style={styles.item}
                  onPress={() => this.play(item)}
                >
                  {item.artwork ? (
                    <FastImage
                      source={{
                        uri: item.artwork
                      }}
                      style={styles.photo}
                    />
                  ) : (
                    <FastImage
                      source={require("../assets/note.png")}
                      style={styles.photo}
                    />
                  )}

                  <Paragraph numberOfLines={1}>{item.album}</Paragraph>
                </TouchableOpacity>
              ) : (
                false
              )
            }
          />
        </View>
      );
    }
    return false;
  }
}

const mapStateToProps = state => ({
  history: state.playerState.history
});

export default connect(
  mapStateToProps,
  {
    loadTrackPlayer,
    playTrack
  }
)(withTheme(Recent));

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: "#d7d1c9"
  },
  title: {
    paddingTop: 10,
    textAlign: "center"
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: "center"
  }
});
