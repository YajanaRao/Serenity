import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { Surface, Title, useTheme } from 'react-native-paper';
import { useQuote } from 'hooks/useQuote';

const QuoteCard = () => {
  const quote = useQuote();
  const { dark } = useTheme();
  const backgroundImage = `https://source.unsplash.com/random/?${dark ? 'black' : 'white'}`;
  return (
    <Surface style={styles.container}>
      <ImageBackground
        source={{ uri: backgroundImage }}
        imageStyle={{ opacity: 0.4, borderRadius: 12 }}
        style={styles.backgroundImageContainer}
        blurRadius={1}
      >
        <View style={styles.quoteContainer}>
          <Title style={{ fontFamily: 'Nunito-Italic' }}>{quote.quote}</Title>
          <Title style={{ fontFamily: 'Nunito-Italic' }}>{`~ ${quote.author}`}</Title>
        </View>
      </ImageBackground>
    </ Surface>
  );
};

export default React.memo(QuoteCard);

const styles = StyleSheet.create({
  container: { flex: 1, marginHorizontal: 12, elevation: 8, borderRadius: 12 },
  backgroundImageContainer: {
    flex: 1,
    minHeight: 200,
    width: "100%",
  },
  quoteContainer: {
    flex: 1,
    justifyContent: "center",
    margin: 12
  }
})
