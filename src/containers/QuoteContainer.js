import React from 'react';
import {Surface, IconButton, Title, Subheading} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

import Quote from '../components/Quote';

export default class QuoteContainer extends React.PureComponent {
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
      return false
    }

    return (
      <Quote
        backgroundImage={this.state.dataSource.background}
        quote={this.state.dataSource.quote}
      />
    );
  }
}
