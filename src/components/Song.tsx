import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';

interface SongProps {
  onClick: () => void;
  played: Boolean;
  title: string;
  artist: string;
  album: string;
  genre: string;
  image: string;
}

const Song = ({
  onClick,
  played,
  title,
  album,
  artist,
  genre,
  image,
}: SongProps) => (
  <TouchableOpacity onPress={onClick}>
    <View>
      <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
      <Text>{title}</Text>
      <Text>{album}</Text>
      <Text>{artist}</Text>
      <Text>{genre}</Text>
    </View>
  </TouchableOpacity>
);

export default Song;
