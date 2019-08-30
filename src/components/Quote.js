import React from 'react';
import {ImageBackground, View} from 'react-native';
import {Paragraph, Surface} from 'react-native-paper';

export default class FetchExample extends React.Component {
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
          <View style={{height: 200, borderRadius: 4, padding: 20}}>
            <Paragraph>Offline is the new luxury</Paragraph>
          </View>
        </Surface>
      );
    }

    return (
      <View style={{flex: 1, marginLeft: 12, marginRight: 12, marginTop: 10}}>
        <ImageBackground
          source={{uri: this.state.dataSource.background}}
          style={{padding: 20, height: 200}}
          imageStyle={{borderRadius: 4}}>
          <Paragraph>{this.state.dataSource.quote}</Paragraph>
        </ImageBackground>
      </View>
    );
  }
}
