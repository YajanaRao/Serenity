import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { useDispatch } from 'react-redux';
import { Youtube } from '@serenity/extensions';
import { Headline } from 'components';
import { Player } from '@serenity/core';
import { TrackItem } from './TrackItem';

const YoutubeSongsList = () => {
  const netInfo = useNetInfo();
  const dispatch = useDispatch();
  const [playlists, setPlaylist] = useState([]);

  useEffect(() => {
    if (netInfo.isConnected) {
      Youtube.searchYoutubeMusic('trending songs').then(data => {
        if (data) {
          setPlaylist(data);
        }
      });
    }
  }, [netInfo]);

  function playAudio(song) {
    dispatch(Player.playSong(song));
  }

  if (netInfo.isConnected && playlists.length) {
    return (
      <View>
        <View
          style={{
            marginLeft: 16,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 8,
          }}
        >
          <Headline>Youtube Songs</Headline>
        </View>
        <FlatList
          horizontal
          data={playlists}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => <TrackItem id={item} onPress={playAudio} />}
        />
      </View>
    );
  }

  return null;
};

export default YoutubeSongsList;
