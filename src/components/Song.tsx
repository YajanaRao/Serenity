import React from 'react';
import { TouchableOpacity, Text, View, Image } from 'react-native';
import { Card, Title } from 'simple-component-kit';

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
  <TouchableOpacity onPress={onClick} style={{ width: 200, height: 250 }}>
    <Card>
      <View>
        <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />
        <Title>{title}</Title>
        <Text>{album}</Text>
        <Text>{artist}</Text>
        <Text>{genre}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

export default Song;
