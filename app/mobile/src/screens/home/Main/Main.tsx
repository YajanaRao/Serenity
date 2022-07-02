import * as React from 'react';
import { ScrollView, View } from 'react-native';
import { Screen, Title, IconButton } from '@serenity/components';
import { useScrollToTop } from '@react-navigation/native';
import { NetNotify } from 'components/NetNotify';
import { RecentContainer } from '../History/RecentView';
import { MostPlayed } from '../MostPlayed/MostPlayedView';
import { ShortCutContainer } from './components/ShortcutContainer';
import QuoteCard from './components/QuoteCard';
import PlaylistList from './components/PlaylistList';
import PodcastList from './components/PodcastList';
import MeditationList from './components/MeditationList';
import BookList from './components/BookList';
import { getGreetingTime } from 'utils/greeting';
import { useNavigation } from '@react-navigation/core';

const Divider = () => <View style={{ marginVertical: 8 }} />;

export const MainScreen = () => {
  const navigation = useNavigation();
  const ref = React.useRef();
  useScrollToTop(ref);

  return (
    <Screen>
      <ScrollView ref={ref}>
        <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginHorizontal: 20, marginBottom: 12, marginTop: 24 }}>
          <Title style={{ fontSize: 30 }}>{getGreetingTime()}</Title>
          <IconButton name="settings-outline" onPress={() => navigation.navigate('Settings')} />
        </View>
        <NetNotify />
        <ShortCutContainer />
        <QuoteCard />
        {/* <Divider /> */}
        <RecentContainer />
        <Divider />
        <MostPlayed />
        <Divider />
        <PodcastList />
        <PlaylistList />
        <Divider />
        <MeditationList />
        <BookList />
      </ScrollView>
    </Screen>
  );
};
