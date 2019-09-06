import React from 'react';
import {TouchableOpacity, View, StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Surface, Subheading, Caption, IconButton} from 'react-native-paper';

const PlayerBar = props => {
  return (
      <TouchableOpacity
          activeOpacity={0.9}
          style={{height: 60, width: '100%'}}
          onPress={props.navigateToPlayer}>
          <Surface style={styles.playBar}>
            {props.active.artwork ? (
              <FastImage
                source={{uri: props.active.artwork}}
                style={styles.artwork}
              />
            ) : (
              <FastImage
                source={require('../assets/note.png')}
                style={styles.artwork}
              />
            )}
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: 4,
              }}>
              <Subheading numberOfLines={1} style={{margin: 0}}>
                {props.active.title}
              </Subheading>
              <Caption numberOfLines={1} style={{margin: 0}}>
                {props.active.artist
                  ? props.active.artist
                  : props.active.album}
              </Caption>
            </View>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
                width: 50,
              }}>
              <IconButton
                icon={ props.status === 'playing' ? 'pause' : 'play-arrow'}
                animated={true}
                size={34}
                onPress={ props.togglePlayback }
                style={{margin: 0, padding: 0}}
              />
            </View>
          </Surface>
        </TouchableOpacity>
    
  )
}

export default PlayerBar;

const styles = StyleSheet.create({
  playBar: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 8,
    elevation: 0,
  },
  artwork: {
    width: 50,
    height: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
