import React, { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { Caption, IconButton, useTheme } from 'react-native-paper';
import { Screen } from '@serenity/components';
import LinearGradient from 'react-native-linear-gradient';
import { Playlist, useAppDispatch, useAppSelector } from '@serenity/core';
import { RepeatContainer } from 'containers/RepeatContainer';
import { PlayerController } from './components/PlayerController';
import { Progress } from './components/ProgressBar';
import { ActiveTrackDetails } from './components/ActiveTrackDetails';
import { PlaylistDialog } from 'components/Dialogs/PlaylistDialog';
import { FavSong } from './components/FavSong';
import Images from 'assets/Images';

export const PlayerScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [visible, setVisible] = useState('');
  const dispatch = useAppDispatch();
  const close = () => {
    navigation.goBack();
  };

  const {track} = useAppSelector(
    (state) => state.player,
  );

  const addToPlaylist = (id: string) => {
    dispatch(Playlist.addSongToPlaylist(id, track.id));
    setVisible('');
  };

  return (
    <Screen>
      <ImageBackground
        source={
          track.cover
            ? { uri: track.cover }
            : Images.welcomeImage
        }
        blurRadius={40}
        style={[styles.imageBackground, { backgroundColor: colors.background }]}
      >
        <LinearGradient
          colors={['transparent', colors.background]}
          style={{ flex: 1 }}
        >
          <PlaylistDialog
            visible={visible === 'DIALOG'}
            hideModal={() => setVisible('')}
            addToPlaylist={addToPlaylist}
          />
          <View style={styles.playerContainer}>
            <View style={styles.container}>
              <IconButton icon="close" onPress={close} />
            </View>
            <ActiveTrackDetails track={track} />
            <Progress />
            <View style={styles.playerToolbox}>
              <FavSong id={track.id} />
              <PlayerController />
              <RepeatContainer />
            </View>
            <View style={styles.extraMenuContainer}>
              <View style={styles.extraIcon}>
                <IconButton
                  size={20}
                  style={styles.icon}
                  icon="menu-outline"
                  onPress={() => navigation.navigate('Queue')}
                />
                <Caption style={styles.icon}>Queue</Caption>
              </View>
              <View style={styles.extraIcon}>
                <IconButton
                  size={20}
                  style={styles.icon}
                  icon="folder-add-outline"
                  onPress={() => setVisible('DIALOG')}
                />
                <Caption>Playlist</Caption>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  playerToolbox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 16,
  },
  extraMenuContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 20,
    marginVertical: 12,
  },
  extraIcon: { justifyContent: 'center', alignItems: 'center' },
  icon: { padding: 0, margin: 0 }
});
