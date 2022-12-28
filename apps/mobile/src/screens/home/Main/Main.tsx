import * as React from 'react';
import { FlatList, Linking, RefreshControl, SectionList, StyleSheet, View } from 'react-native';
import { Headline, Screen, Title } from '@serenity/components';
import { NetNotify } from 'components/NetNotify';
import { ShortCutContainer } from './components/ShortcutContainer';
import QuoteCard from './components/QuoteCard';
import { capitalize } from 'lodash';
import { useQuery } from 'react-query';
import { getMedia } from 'services/supabase';
import analytics from '@react-native-firebase/analytics';
import { Media } from '../components/Media';
import { Card, Paragraph, useTheme } from 'react-native-paper';

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
        keyExtractor={(item, index) => index.toString()}
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
        renderSectionHeader={({ section }) => {
          if (section.title !== "post") {
            return (
              <>
                <View
                  style={styles.titleContainer}
                >
                  <Headline>{capitalize(section.title)}</Headline>
                </View>
                <FlatList
                  horizontal
                  data={section.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => <Media item={item} onPress={navigateToMedia} />}
                  showsHorizontalScrollIndicator={false}
                />
              </>
            )
          }
          return null;
        }}
        renderItem={({ item, section }) => {
          if (section.title === "post") {
            return (
              <Card style={{margin: 12}} onPress={() => Linking.openURL(item.url)}>
                <Card.Cover source={{ uri: item.cover }} />
                <Card.Content>
                  <Title>{item.title}</Title>
                  <Paragraph numberOfLines={3}>{item.description}</Paragraph>
                </Card.Content>
              </Card>
            )
          }
          return null;
        }}
      />
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
