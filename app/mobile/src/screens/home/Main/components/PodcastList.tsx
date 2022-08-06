import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { SongProps } from '@serenity/core';
import { Podcasts } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';
import { Podcast } from 'screens/home/components/Podcast';
import analytics from '@react-native-firebase/analytics';

const PodcastList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const {data, isLoading} = useQuery('podcasts', () => Podcasts.getPodcasts())


  const navigateToPodcast = (item: any) => {
    analytics().logSelectItem({
      content_type: 'podcast',
      item_list_id: item.id.toString(),
      item_list_name: item.title
    })
    navigation.navigate("Podcast", { podcast: item })
  };
 

  if (netInfo.isConnected && !isLoading) {    
    return (
      <View>
        <View
          style={styles.titleContainer}
        >
          <Headline>Podcasts</Headline>
        </View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Podcast track={item} onPress={navigateToPodcast} />}
        />
      </View>
    );
  }

  return null;
};

export default PodcastList;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
