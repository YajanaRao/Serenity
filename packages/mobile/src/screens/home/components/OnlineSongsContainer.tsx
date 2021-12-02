import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { Track } from './Track';
import { Meditation } from './Meditation';
import { SongProps } from '@serenity/core';
import { Podcasts, Meditations, Songs } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';

const OnlineSongsContainer = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();
  const [playlists, setPlaylists] = React.useState([]);
  const [podcasts, setPodcasts] = React.useState([]);
  const [meditations, setMeditations] = React.useState([]);

  useEffect(() => {
    Songs.getPlaylists().then(response => setPlaylists(response));
    Podcasts.getPodcasts().then(response => setPodcasts(response));
    setMeditations(Meditations.getMeditations())
  }, [])

  const navigateToPodcast = (item: any) => {
    navigation.navigate("Podcast", { podcast: item })
  };
  const navigateToMeditation = (item: any) => {
    navigation.navigate("Meditation", { meditation: item })
  };
  const navigateToSongs = (item: any) => {
    navigation.navigate("Songs", { playlist: item });
  }

  if (netInfo.isConnected) {    
    return (
      <View>
        { playlists?.length ? <View
          style={styles.titleContainer}
        >
          <Headline>Songs</Headline>
        </View> : null }
        <FlatList
          horizontal
          data={playlists}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Track track={item} onPress={navigateToSongs} />}
        />
        <View
          style={styles.titleContainer}
        >
          <Headline>Podcasts</Headline>
        </View>
        <FlatList
          horizontal
          data={podcasts}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Track track={item} onPress={navigateToPodcast} />}
        />
        <View
          style={styles.titleContainer}
        >
          <Headline>Meditations</Headline>
        </View>
        <FlatList
          horizontal
          data={meditations}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Meditation track={item} onPress={navigateToMeditation} />}
        />
      </View>
    );
  }

  return null;
};

export default OnlineSongsContainer;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
