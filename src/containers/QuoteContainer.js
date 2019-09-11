import React from 'react';

import Quote from '../components/Quote';

export default class QuoteContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: {}
    }
  }

  componentDidMount() {
    try {
      fetch('https://quotes.rest/qod.json')
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
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
    if (this.state.dataSource.quote == 'undefined') {
      return false;
    }

    return (
      <Quote
        backgroundImage={this.state.dataSource.background}
        quote={this.state.dataSource.quote}
      />
    );
  }
}
