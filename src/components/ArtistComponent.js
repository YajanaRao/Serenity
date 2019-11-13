import React, { useState } from 'react';
import { Avatar, Badge, List } from 'react-native-paper';
import { View } from 'react-native';

function ArtistComponent({ item, addArtist }) {
  const [selected, selectArtist] = useState(false);

  const selectArtits = () => {
    selectArtist(true);
    addArtist(item);
  };

  return (
    <List.Item
      title={item.artist}
      left={props => (
        <View>
          <Badge
            style={{
              right: 2,
              top: -2,
              position: 'absolute',
              zIndex: 10,
            }}
            size={24}
            visible={selected}
          />
          <Avatar.Image
            source={{ uri: item.artwork }}
            // size={80}
            style={{ margin: 0 }}
          />
        </View>
      )}
      onPress={selectArtits}
    />
  );
}

export default ArtistComponent;
