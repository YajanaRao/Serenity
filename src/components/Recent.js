import React from 'react';
import {withTheme, Title, Paragraph} from 'react-native-paper';
import {StyleSheet, View, FlatList, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

// FIXME: Testing the application
const Recent = props => {
  return (
    <View style={styles.surface}>
      <Title style={styles.title}>Recent songs</Title>
      <FlatList
        horizontal={true}
        data={props.history}
        keyExtractor={(item, index) => index.toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) =>
          item ? (
            <TouchableOpacity
              style={styles.item}
              onPress={() => props.play(item)}>
              {item.artwork ? (
                <FastImage
                  source={{
                    uri: item.artwork,
                  }}
                  style={styles.photo}
                />
              ) : (
                <FastImage
                  source={require('../assets/note.png')}
                  style={styles.photo}
                />
              )}

              <Paragraph numberOfLines={1}>{item.title}</Paragraph>
            </TouchableOpacity>
          ) : (
            false
          )
        }
      />
    </View>
  );
};

export default withTheme(Recent);

const styles = StyleSheet.create({
  photo: {
    width: 120,
    height: 120,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
  title: {
    paddingTop: 10,
    textAlign: 'center',
  },
  item: {
    marginLeft: 12,
    marginBottom: 4,
    alignItems: 'center',
    width: 120,
  },
});
