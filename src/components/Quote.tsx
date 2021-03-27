import React from 'react';
import { ImageBackground, View } from 'react-native';
import { Title } from 'react-native-paper';

interface Props {
  backgroundImage: string;
  quote: string;
}

export const Quote = ({ backgroundImage, quote }: Props) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        imageStyle={{ opacity: 0.4 }}
        style={{ padding: 20, minHeight: 200 }}
        blurRadius={1}
      >
        <Title style={{ fontFamily: 'Nunito-Italic' }}>{quote}</Title>
      </ImageBackground>
    </View>
  );
};
