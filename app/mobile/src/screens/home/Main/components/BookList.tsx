import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';
import { Headline } from '@serenity/components';
import { SongProps } from '@serenity/core';
import { Books } from '@serenity/extensions';
import { useNavigation } from '@react-navigation/core';
import { useQuery } from 'react-query';
import { Book } from 'screens/home/components/Book';
import analytics from '@react-native-firebase/analytics';

const BookList = () => {
  const netInfo = useNetInfo();
  const navigation = useNavigation();

  const { data, isLoading } = useQuery('books', () => Books.getBooks())


  const navigateToPodcast = (item: any) => {
    analytics().logSelectItem({
      content_type: 'book',
      item_list_id: item.id.toString(),
      item_list_name: item.title
    })
    navigation.navigate("Book", { book: item })
  };


  if (netInfo.isConnected && !isLoading) {
    return (
      <View style={styles.container}>
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
          renderItem={({ item }: { item: SongProps }) => <Book track={item} onPress={navigateToPodcast} />}
        />
      </View>
    );
  }

  return null;
};

export default BookList;

const styles = StyleSheet.create({
  container: { marginVertical: 18 },
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
