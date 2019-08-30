import React from 'react';
import {ImageBackground, View} from 'react-native';
import {
  Surface,
  IconButton,
  Title,
  Subheading,
} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

export default class FetchExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    try {
      fetch('https://quotes.rest/qod.json')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            isLoading: false,
            dataSource: responseJson.contents.quotes[0],
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    if (this.state.isLoading || this.state.dataSource == 'undefined') {
      return (
        <Surface
          style={{
            flex: 1,
            marginLeft: 12,
            marginRight: 12,
            marginTop: 10,
          }}>
          <LinearGradient
            colors={['#B24592', '#F15F79']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            style={{height: 200, borderRadius: 4, padding: 20, justifyContent: 'center', alignItems: 'center'}}>
            <IconButton
              icon="signal-wifi-off"
            />
            <Title>Offline</Title>
            <Subheading>Offline is the new luxury</Subheading>
          </LinearGradient>
          {/* <View style={{height: 200, borderRadius: 4, padding: 20}}></View> */}
        </Surface>
      );
    }

    return (
      <View style={{flex: 1, marginLeft: 12, marginRight: 12, marginTop: 10}}>
        <ImageBackground
          source={{uri: this.state.dataSource.background}}
          style={{padding: 20, height: 200}}
          imageStyle={{borderRadius: 4}}>
          <Subheading>{this.state.dataSource.quote}</Subheading>
        </ImageBackground>
      </View>
    );
  }
}
