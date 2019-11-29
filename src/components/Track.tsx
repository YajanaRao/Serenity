import React from 'react';
import { withTheme, List, Theme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

interface TrackProps {
  title: string;
  album?: string;
  artist?: string;
}

interface Props {
  theme: Theme;
  track: TrackProps;
  active: boolean;
  play(): void;
}

const Track = ({ theme: { colors }, track, active, play }: Props) => (
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

export default withTheme(Track);

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
});
