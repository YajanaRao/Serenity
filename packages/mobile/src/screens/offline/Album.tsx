import React, { useEffect, useState, useRef } from 'react';
import { Divider, List } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { StyleSheet, RefreshControl, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isEmpty } from 'lodash';
import { useScrollToTop } from '@react-navigation/native';

import { getOfflineAlbums } from '../../actions/mediaStore';
import { Blank } from '../../components/Blank';
import { Screen } from 'components';
import { DefaultImage } from '../../components/DefaultImage';
import { AlbumProps } from '../../utils/types';
import { RootReducerType } from '../../reducers';
import { giveReadOfflineAccess } from '../../actions/userState';

export const AlbumScreen = ({ navigation }) => {
  const ref = useRef(null);
  const albums = useSelector(
    (state: RootReducerType) => state.mediaStore.albums,
  );
  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.user,
  );

  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  useScrollToTop(ref);

  useEffect(() => {
    if (offlineReadAccessGiven) {
      dispatch(getOfflineAlbums());
    }
  }, [offlineReadAccessGiven]);

  const fetchData = () => {
    setRefreshing(true);
    getOfflineAlbums();
    setRefreshing(false);
  };

  if (!isEmpty(albums)) {
    return (
      <Screen>
        <FlatList
          ref={ref}
          data={albums}
          ItemSeparatorComponent={() => <Divider inset />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: { item: AlbumProps }) => (
            <List.Item
              title={item.album}
              left={props =>
                item.cover === null ? (
                  <DefaultImage style={styles.icons} />
                ) : (
                  <FastImage
                    {...props}
                    source={{ uri: item.cover }}
                    style={styles.icons}
                  />
                )
              }
              description={`${item.numberOfSongs} songs`}
              onPress={() => {
                navigation.navigate('AlbumSongs', {
                  album: item,
                });
              }}
            />
          )}
        />
      </Screen>
    );
  }

  if (!offlineReadAccessGiven) {
    return (
      <Blank
        text="View your media by Granting Storage Permission"
        fetchData={() => dispatch(giveReadOfflineAccess())}
        buttonText="Allow Access"
      />
    );
  }

  return <Blank text="No offline songs found.." fetchData={fetchData} />;
};

const styles = StyleSheet.create({
  icons: {
    width: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
