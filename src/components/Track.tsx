import React from 'react';
import { List, useTheme } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import ActiveTrackIcon from './ActiveTrackIcon';

interface TrackProps {
  title: string;
  album?: string;
  artist?: string;
}

interface Props {
  track: TrackProps;
  active: boolean;
  play(): void;
}

export const Track = React.memo(({ track, active, play }: Props) => {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <View style={[styles.surface, { backgroundColor: colors.background }]}>
      <List.Item
        title={track.title}
        description={track.artist ? track.artist : track.album}
        right={props =>
          active ? (
            <ActiveTrackIcon style={[{ height: 30, width: 30 }, props.style]} />
          ) : (
            false
          )
        }
        onPress={() => play()}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  surface: {
    padding: 0,
    margin: 0,
    borderRadius: 4,
  },
});
