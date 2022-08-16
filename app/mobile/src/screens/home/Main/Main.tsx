import * as React from 'react';
import { FlatList, RefreshControl, SectionList, StyleSheet, View } from 'react-native';
import { Headline, Screen } from '@serenity/components';
import { NetNotify } from 'components/NetNotify';
import { ShortCutContainer } from './components/ShortcutContainer';
import QuoteCard from './components/QuoteCard';
import { capitalize } from 'lodash';
import { useQuery } from 'react-query';
import { getMedia } from 'services/supabase';
import analytics from '@react-native-firebase/analytics';
import { Media } from '../components/Media';
import { useTheme } from 'react-native-paper';

const Divider = () => <View style={{ marginVertical: 8 }} />;

export function MainScreen({ navigation }) {

  const { colors } = useTheme();

  function navigateToMedia(item: any) {
    analytics().logSelectItem({
      content_type: item.type,
      item_list_id: item.title,
      item_list_name: item.title
    })
    if (item.type === "meditation") {
      navigation.navigate("Meditation", { meditation: item })
    } else if (item.type === 'podcast') {
      navigation.navigate("Podcast", { podcast: item })
    } else if (item.type === 'book') {
      navigation.navigate("Book", { book: item })
    } else {
      navigation.navigate("Songs", { playlist: item });
    }
  };

  const { isLoading, refetch, data } = useQuery(['media'], getMedia, {
    initialData: []
  })


  return (
    <Screen>
      <NetNotify />
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={data}
        refreshing={isLoading}
        onRefresh={refetch}
        ListHeaderComponent={() => (
          <>
            <ShortCutContainer />
            <QuoteCard />
            <Divider />
          </>
        )}
        refreshControl={
          <RefreshControl
            progressViewOffset={32}
            refreshing={isLoading}
            onRefresh={refetch}
            colors={['#12c2e9', '#c471ed', '#f64f59']}
            progressBackgroundColor={colors.surface}
            titleColor={colors.text}
            tintColor={colors.primary}
          />
        }
        renderSectionHeader={({ section }) => (
          <>
            <View
              style={styles.titleContainer}
            >
              <Headline>{capitalize(section.title)}</Headline>
            </View>
            <FlatList
              horizontal
              data={section.data}
              renderItem={({ item }) => <Media item={item} onPress={navigateToMedia} />}
              keyExtractor={(item) => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </>
        )}
        renderItem={({ item, section }) => {
          return null;
        }}
      />
      {/* <ScrollView ref={ref}>
        <ShortCutContainer />
        <QuoteCard />
        <RecentContainer />
        <Divider />
        <MostPlayed />
        <Divider />
        <PodcastList />
        <PlaylistList />
        <Divider />
        <MeditationList />
        <BookList />
      </ScrollView> */}
    </Screen>
  );
};

const styles = StyleSheet.create({
  titleContainer: {
    marginLeft: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  }
});
