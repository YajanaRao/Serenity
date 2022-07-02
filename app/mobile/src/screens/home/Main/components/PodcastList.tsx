import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { Track } from '../../components/Track';
import { SongProps } from '@serenity/core';
import { Podcasts } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';

const PodcastList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const {data, isLoading} = useQuery('podcasts', () => Podcasts.getPodcasts())


  const navigateToPodcast = (item: any) => {
    navigation.navigate("Podcast", { podcast: item })
  };
 

  if (netInfo.isConnected && !isLoading) {    
    return (
      <View>
          <Headline style={styles.title}>Podcasts</Headline>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{paddingTop: 14}}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Track track={item} onPress={navigateToPodcast} />}
        />
      </View>
    );
  }

  return null;
};

export default PodcastList;

const styles = StyleSheet.create({
  title: {
    marginLeft: 16,
   
  }
});
