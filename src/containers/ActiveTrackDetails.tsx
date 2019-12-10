import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Subheading, Title } from 'react-native-paper';
import { DefaultImage } from '../components/DefaultImage';
import { RootReducerType } from '../reducers';

export const ActiveTrackDetails = () => {
  const active = useSelector(
    (state: RootReducerType) => state.playerState.active,
  );
  return (
    <View style={{ flex: 1 }}>
      <View style={styles.centerContainer}>
        {active.cover ? (
          <FastImage source={{ uri: active.cover }} style={[styles.artCover]} />
        ) : (
          <DefaultImage style={styles.artCover} />
        )}
      </View>
      <View style={styles.centerContainer}>
        <Title numberOfLines={1}>{active.title}</Title>
        <Subheading numberOfLines={1}>
          {active.artist ? active.artist : active.album}
        </Subheading>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    marginHorizontal: 16,
  },
  artCover: {
    width: Dimensions.get('window').width - 50,
    height: Dimensions.get('window').width - 50,
    maxHeight: 300,
    maxWidth: 300,
    borderRadius: 12,
    elevation: 4,
  },
});
