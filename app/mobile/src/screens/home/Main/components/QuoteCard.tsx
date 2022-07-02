import * as React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import { ActivityIndicator, Surface, Title, useTheme } from 'react-native-paper';
import { useQuote } from 'hooks/useQuote';
import { NeomorphFlex } from 'react-native-neomorph-shadows';

const QuoteCard = () => {
  const { quote, isLoading } = useQuote();
  const { dark, colors } = useTheme();
  const backgroundImage = `https://source.unsplash.com/random/?${dark ? 'black' : 'white'}`;
  return (
    <View style={styles.container}>
      <NeomorphFlex
        darkShadowColor={"black"}
        lightShadowColor={"white"}
        // inner // <- enable shadow inside of neomorph
        // swapShadows // <- change zIndex of each shadow color
        style={{
          shadowRadius: 8,
          flex: 1,
          margin: 12,
          borderRadius: 12,
          // elevation: 8,
          backgroundColor: colors.surface,
          // width: 150,
          // height: 150,
        }}
      >
        <ImageBackground
          source={{ uri: backgroundImage }}
          imageStyle={{ opacity: 0.4, borderRadius: 12 }}
          style={styles.backgroundImageContainer}
          blurRadius={1}
        >
          <View style={styles.quoteContainer}>
            {isLoading ? <ActivityIndicator color={colors.text} /> : (
              <View>
                <Title style={{ fontFamily: 'Nunito-Italic' }}>{quote?.quote}</Title>
                <Title style={{ fontFamily: 'Nunito-Italic' }}>{`~ ${quote?.author}`}</Title>
              </View>
            )}
          </View>
        </ImageBackground>
      </NeomorphFlex>
    </View>
  );
};

export default React.memo(QuoteCard);

const styles = StyleSheet.create({
  container: {  marginHorizontal: 12 },
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
