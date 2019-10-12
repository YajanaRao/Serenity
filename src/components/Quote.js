import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Title} from 'react-native-paper';
import PropTypes from 'prop-types';

export default Quote = props => {
  return (
    <View style={{flex: 1}}>
      <ImageBackground
        source={{uri: props.backgroundImage}}
        style={{padding: 20, height: 200}}
        blurRadius={1}
        // imageStyle={{borderRadius: 4}}
      >
        <Title style={{fontFamily: 'Feather'}}>{props.quote}</Title>
      </ImageBackground>
    </View>
  );
};

Quote.propTypes = {
  backgroundImage: PropTypes.string,
  quote: PropTypes.string
}