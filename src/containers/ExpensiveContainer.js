import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';
import ErrorBoundary from './ErrorBoundary';

let QuoteContainer = null;
let PopularContainer = null;
let Top20Container = null;
let ArtistContainer = null;

class ExpensiveContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isLoaded: false,
    };
  }

  componentDidMount() {
    const { load } = this.props;
    if (load) {
      QuoteContainer = require('./QuoteContainer').default;
      PopularContainer = require('./PopularContainer').default;
      Top20Container = require('./Top20Container').default;
      ArtistContainer = require('./ArtistContainer').default;
      this.setState({ isLoaded: true });
    }
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            height: 500,
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
    return (
      <ErrorBoundary>
        <QuoteContainer />
        <PopularContainer />
        <Top20Container />
        <ArtistContainer />
      </ErrorBoundary>
    );
  }
}

export default ExpensiveContainer;
