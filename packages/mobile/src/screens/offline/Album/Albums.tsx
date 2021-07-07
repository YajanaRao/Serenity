import React, { useEffect, useRef } from 'react';
import { Divider } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { RefreshControl, FlatList } from 'react-native';
import { isEmpty } from 'lodash';
import { useScrollToTop } from '@react-navigation/native';

import { Screen } from '@serenity/components';
import { fetchOfflineAlbums, selectAlbumIds, giveReadOfflineAccess } from '@serenity/core';
import { Blank } from '../../../components/Blank';
import { RootReducerType } from '../../../../../core/src/reducers';
import { Album } from './components/Album';

export const AlbumScreen = ({ }) => {
  const ref = useRef(null);
  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.user,
  );
  const albums = useSelector(state => selectAlbumIds(state));
  const { loading, error } = useSelector(state => state.media.albums);

  const dispatch = useDispatch();
  useScrollToTop(ref);

  useEffect(() => {
    if (!albums.length) {
      fetchData();
    }
  }, [offlineReadAccessGiven]);

  const fetchData = () => {
    if (offlineReadAccessGiven && !loading) {
      dispatch(fetchOfflineAlbums());
    }
  };

  if (!isEmpty(albums)) {
    return (
      <Screen>
        <FlatList
          ref={ref}
          data={albums}
          ItemSeparatorComponent={() => <Divider inset />}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={fetchData} />
          }
          keyExtractor={(item: string) => item}
          renderItem={({ item }: { item: string }) => <Album id={item} />}
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


