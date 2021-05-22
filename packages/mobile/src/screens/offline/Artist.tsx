import React, { useState, useEffect } from 'react';
import { Divider, List, Avatar } from 'react-native-paper';
import { RefreshControl, FlatList } from 'react-native';
import { isEmpty } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import generate from 'string-to-color';
import { getOfflineArtists } from '../../actions/mediaStore';
import { Blank } from '../../components/Blank';
import { Screen } from 'components';
import { giveReadOfflineAccess } from '../../actions/userState';
import { RootReducerType } from '../../reducers';

interface ArtistProps {
  artist: string;
  numberOfSongs: number;
}

interface ItemProps {
  item: ArtistProps;
}

export const ArtistScreen = ({ navigation }) => {
  const artists = useSelector((state: any) => state.mediaStore.artists);
  const dispatch = useDispatch();
  const [refreshing, setRefreshing] = useState(false);
  const { offlineReadAccessGiven } = useSelector(
    (state: RootReducerType) => state.user,
  );

  useEffect(() => {
    if (offlineReadAccessGiven) {
      dispatch(getOfflineArtists());
    }
  }, [offlineReadAccessGiven]);

  const fetchData = () => {
    setRefreshing(true);
    getOfflineArtists();
    setRefreshing(false);
  };

  if (!isEmpty(artists)) {
    return (
      <Screen>
        <FlatList
          data={artists}
          ItemSeparatorComponent={() => <Divider inset />}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={fetchData} />
          }
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }: ItemProps) => (
            <List.Item
              title={item.artist}
              description={`${item.numberOfSongs} Songs`}
              left={props => (
                <Avatar.Text
                  {...props}
                  size={54}
                  style={{ backgroundColor: generate(item.artist) }}
                  label={item.artist.charAt(0)}
                />
              )}
              onPress={() =>
                navigation.navigate('ArtistSongs', {
                  artist: item,
                })
              }
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
  return <Blank text="No offline Artists found.." fetchData={fetchData} />;
};
