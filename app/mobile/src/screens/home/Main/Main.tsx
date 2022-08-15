import * as React from 'react';
import { FlatList, RefreshControl, SectionList, StyleSheet, View } from 'react-native';
import { Headline, Screen } from '@serenity/components';
import { NetNotify } from 'components/NetNotify';
import { RecentContainer } from '../History/RecentView';
import { MostPlayed } from '../MostPlayed/MostPlayedView';
import { ShortCutContainer } from './components/ShortcutContainer';
import QuoteCard from './components/QuoteCard';
import { capitalize, groupBy } from 'lodash';
import { useQuery } from 'react-query';
import { getMedia } from 'services/supabase';
import analytics from '@react-native-firebase/analytics';
import { Media } from '../components/Media';

const Divider = () => <View style={{ marginVertical: 8 }} />;

export const MainScreen = ({ navigation }) => {
  const [media, setMedia] = React.useState([])

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

  const { isLoading, refetch, data } = useQuery(['media'], getMedia)

  async function formatData() {
    let results = groupBy(data, 'type');
    let datasets = Object.keys(results).map(index => {
      return {
        title: index,
        data: results[index]
      }
    });
    setMedia(datasets)
  }
  React.useEffect(() => {
    formatData()
  }, [data])

  return (
    <Screen>
      <NetNotify/>
      <SectionList
        stickySectionHeadersEnabled={false}
        sections={media}
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
