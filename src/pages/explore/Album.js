import * as React from 'react';

import Screen from '../../components/Screen';
import EmptyFavoriteAlbums from '../../components/EmptyFavoriteAlbums';

class Album extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {

    return (
      <Screen>
        <EmptyFavoriteAlbums />

        {/* <FlatList
                        data={Media}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <List.Item
                                title={item.album}
                                description={item.artist}
                                left={props => (
                                    <FastImage {...props} source={{ uri: item.artwork }} style={styles.icons} />
                                )}
                                // onPress={() => this.play()}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                            />
                        )}
                    /> */}
      </Screen>
    );
  }
}

export default Album;