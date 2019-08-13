import React, { PureComponent } from "react";
import { withTheme, List } from "react-native-paper";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import isEqual from "lodash/isEqual";
import isUndefined from "lodash/isUndefined";
import { loadTrackPlayer, addToQueue } from "../actions/playerState";
import isEmpty from "lodash/isEmpty";

/*
    TODO: 
    - may not be required for all render 
    - Adding duration would enhance the user experience
    - Testing has to be done
*/

// FIXME: Testing the application
class Track extends PureComponent {
  renderRightIcon = props => {
    const { track, active } = this.props;
    if(!isUndefined(active.id)){
      if (isEqual(active.id, track.id)) {
        const { colors } = this.props.theme;
        return (
          <List.Icon {...props} icon="equalizer" color={colors.accent} />
        );
      }
    }
    return false;
  };

  play = () => {
    const { track, active } = this.props;
    if (!isEmpty(active)) {
      if (isEqual(active.id, track.id)) {
        return false;
      }
    }
    this.props.loadTrackPlayer(track);
  };

  render() {
    const { track } = this.props;
    const { colors } = this.props.theme;

    return (
      <View style={[styles.surface, { backgroundColor: colors.background }]}>
        <List.Item
          title={track.title}
          description={track.artist ? track.artist : track.album}
          right={props =>
            this.props.active ? this.renderRightIcon(props) : false
          }
          onPress={() => this.play()}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  active: state.playerState.active
});

export default connect(
  mapStateToProps,
  { loadTrackPlayer, addToQueue }
)(withTheme(Track));

const styles = StyleSheet.create({
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
