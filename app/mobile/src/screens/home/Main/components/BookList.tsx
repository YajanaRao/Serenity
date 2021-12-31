import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { Track } from '../../components/Track';
import { SongProps } from '@serenity/core';
import { Books } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';

const BookList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const {data, isLoading} = useQuery('books', () => Books.getBooks())


  const navigateToPodcast = (item: any) => {
    navigation.navigate("Book", { book: item })
  };
 

  if (netInfo.isConnected && !isLoading) {    
    return (
      <View>
        <View
          style={styles.titleContainer}
        >
          <Headline>Audio Books</Headline>
        </View>
        <FlatList
          horizontal
          data={data}
          keyExtractor={(item) => item.title}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }: { item: SongProps }) => <Track track={item} onPress={navigateToPodcast} />}
        />
      </View>
    );
  }

  return null;
};

export default BookList;

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
