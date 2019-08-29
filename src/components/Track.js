import React from 'react';
import {withTheme, List} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';

/*
    TODO: 
    - may not be required for all render 
    - Adding duration would enhance the user experience
    - Testing has to be done
*/

// FIXME: Testing the application
const Track = props => {
  const {track, active} = props;
  const {colors} = props.theme;

  return (
    <View style={[styles.surface, {backgroundColor: colors.background}]}>
      <List.Item
        title={track.title}
        description={track.artist ? track.artist : track.album}
        right={props =>
          active ? (
            <List.Icon {...props} icon="equalizer" color={colors.accent} />
          ) : (
            false
          )
        }
        onPress={() => props.play()}
      />
    </View>
  );
};

export default withTheme(Track);

const styles = StyleSheet.create({
  icons: {
    width: 50,
    borderRadius: 4,
  },
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
});
