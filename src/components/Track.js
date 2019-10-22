import React from 'react';
import { withTheme, List } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';

/*
    TODO: 
    - may not be required for all render 
    - Adding duration would enhance the user experience
    - Testing has to be done
*/

// FIXME: Testing the application
const Track = ({ theme: { colors }, track, active, play }) => (
  <View style={[styles.surface, { backgroundColor: colors.background }]}>
    <List.Item
      title={track.title}
      description={track.artist ? track.artist : track.album}
      right={props =>
        active ? (
          <List.Icon {...props} icon="poll" color={colors.accent} />
        ) : (
          // <List.Icon {...props} icon="more-vert" onPress={() => bs.current.snapTo(1)}/>
          false
        )
      }
      onPress={() => play()}
    />
  </View>
);

Track.propTypes = {
  track: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
};

export default withTheme(Track);

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
});
