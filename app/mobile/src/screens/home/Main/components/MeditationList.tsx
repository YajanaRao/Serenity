import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { Meditation } from '../../components/Meditation';
import { SongProps } from '@serenity/core';
import { Meditations } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';
import analytics from '@react-native-firebase/analytics';
import { useQuery } from 'react-query';

const MeditationList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const {data, isLoading} = useQuery('podcasts', () => Meditations.getMeditations())


  const navigateToMeditation = (item: any) => {
    analytics().logSelectItem({
      content_type: 'meditation',
      item_list_id: item.id,
      item_list_name: item.title
    })
    navigation.navigate("Meditation", { meditation: item })
  };

  if (netInfo.isConnected) {    
    return (
      <View>
        <View
          style={styles.titleContainer}
        >
          <Headline>Meditations</Headline>
        </View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.id}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Meditation track={item} onPress={navigateToMeditation} />}
        />
      </View>
    );
  }

  return null;
};

export default MeditationList;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
