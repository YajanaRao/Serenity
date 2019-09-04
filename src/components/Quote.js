import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Subheading} from 'react-native-paper';

export default Quote = (props) => {
  return (
    <View style={{flex: 1, marginLeft: 12, marginRight: 12, marginTop: 10}}>
      <ImageBackground
        source={{uri: props.backgroundImage}}
        style={{padding: 20, height: 200}}
        imageStyle={{borderRadius: 4}}>
        <Subheading>{props.quote}</Subheading>
      </ImageBackground>
    </View>
  );
};
