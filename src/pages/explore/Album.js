import * as React from 'react';
import { FlatList } from 'react-native';
import { List } from 'react-native-paper';
import FastImage from 'react-native-fast-image';

import Screen from '../../components/Screen';
import EmptyFavoriteAlbums from '../../components/EmptyFavoriteAlbums';
import { getAlbums } from '../../actions/realmAction';
import { deserializeAlbums } from '../../utils/database';

class Album extends React.Component {
  constructor(props) {
    super(props);
    this.realmAlbums = getAlbums();
    const albums = deserializeAlbums(this.realmAlbums);
    this.state = {
      albums,
    };
  }

  componentDidMount() {
    this.realmAlbums.addListener((albums, changes) => {
      if (
        changes.insertions.length > 0 ||
        changes.modifications.length > 0 ||
        changes.deletions.length > 0
      ) {
        this.setState({
          albums: deserializeAlbums(albums),
        });
      }
    });
  }

  componentWillUnmount() {
    this.realmAlbums.removeAllListeners();
  }

  static navigationOptions = {
    header: null,
  };

  render() {
    const { albums } = this.state;
    // const {
    //   navigation: { navigate }
    // } = this.props;
    return (
      <Screen>
        {albums.length ? (
          <FlatList
            data={albums}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.name}
                description={item.artist}
                left={props => (
                  <FastImage
                    {...props}
                    source={{ uri: item.cover }}
                    style={{ width: 50, height: 50, borderRadius: 4 }}
                  />
                )}
                // onPress={() =>
                //   navigate("Songs", {
                //     songs: item.songs,
                //     img: item.artwork,
                //     title: item.album
                //   })}
              />
            )}
          />
        ) : (
          <EmptyFavoriteAlbums />
        )}
      </Screen>
    );
  }
}

export default Album;
