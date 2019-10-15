import React, {useState} from 'react';
import {Chip, Avatar, Badge} from 'react-native-paper';
import {TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

function ArtistComponent({item}) {
  const [selected, selectArtist] = useState(false);
  return (
    <TouchableOpacity
      style={{margin: 8, justifyContent: 'center', alignItems: 'center'}}
      onPress={selectArtist}>
      {/* <Chip
                selected={selected}
                avatar={<FastImage
                    source={{ uri: item.artwork }}
                />}>{item.artist}</Chip> */}
      <Badge
        style={{
          right: 2,
          top: -2,
          position: 'absolute',
          zIndex: 10,
        }}
        size={24}
        visible={selected}></Badge>
      <Avatar.Image
        source={{uri: item.artwork}}
        size={80}
        style={{margin: 0}}
      />
    </TouchableOpacity>
  );
}

export default ArtistComponent;
