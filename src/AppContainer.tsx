import React, { useEffect } from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Song from './components/Song';
import ErrorBoundary from './components/ErrorBoundary';
import { bootstrap } from './actions/integrations';
import { ThemeProvider, theme } from 'simple-component-kit';

interface AppContainerProps {}

const AppContainer = (props: AppContainerProps) => {
  const dispatch = useDispatch();

  const songs = useSelector((state: any) => state.library.songs);
  const plugins = useSelector((state: any) => state.integrations.plugins);

  useEffect(() => {
    // dispatch(bootstrap([Plugins.LastFM]));
    return () => {};
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <ErrorBoundary>
        <View style={styles.container}>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={plugins}
            renderItem={({ item }: { item: any }) => <Text>{item.name}</Text>}
          />
          <FlatList
            horizontal
            data={songs}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }: { item: any }) => (
              <Song
                title={item.title}
                album={item.album}
                artist={item.artist}
                image={item.image}
                genre={item.genre}
                onClick={() => console.log('clicked')}
                played={item.played}
              />
            )}
          />
        </View>
      </ErrorBoundary>
    </ThemeProvider>
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {},
});
