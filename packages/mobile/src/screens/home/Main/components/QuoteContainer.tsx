import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Title, useTheme } from 'react-native-paper';
import { useQuote } from '~/hooks/useQuote';

export const QuoteContainer = () => {
  const quote = useQuote();
  const { dark } = useTheme();



  const backgroundImage = `https://source.unsplash.com/random/?${dark ? 'black' : 'white'}`;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        imageStyle={{ opacity: 0.4 }}
        style={styles.backgroundImageContainer}
        blurRadius={1}
      >
        <Title style={{ fontFamily: 'Nunito-Italic' }}>{quote}</Title>
      </ImageBackground>
    </View>
  );




};

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImageContainer: { padding: 20, minHeight: 200 }
})
