import * as React from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Song from './components/Song';
import { __init__ } from './actions';

interface AppContainerProps {}

const AppContainer = (props: AppContainerProps) => {
  const dispatch = useDispatch();
  dispatch(__init__());
  const songs = useSelector((state: any) => state.library.songs);
  console.log(songs);
  return (
    <View style={styles.container}>
      <FlatList
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
  );
};

export default AppContainer;

const styles = StyleSheet.create({
  container: {},
});
