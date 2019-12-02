import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import FastImage from 'react-native-fast-image';
import { Subheading, Title } from 'react-native-paper';
import DefaultImage from '../components/DefaultImage';

function ActiveTrackDetails() {
  const active = useSelector((state: any) => state.playerState.active);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.centerContainer}>
        {active.artwork ? (
          <FastImage
            source={{ uri: active.artwork }}
            style={[styles.artCover]}
          />
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
}

export default ActiveTrackDetails;

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
