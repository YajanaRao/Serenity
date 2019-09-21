import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View } from 'react-native';

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
    if(this.props.load){
        QuoteContainer = require('./QuoteContainer').default;
        PopularContainer = require('./PopularContainer').default;
        Top20Container = require('./Top20Container').default;
        ArtistContainer = require('./ArtistContainer').default;
        setTimeout(() => this.setState({isLoaded: true}), 5000);
    }
  }



  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 500 }}>
          <ActivityIndicator />
        </View>
      );
    }
    return (
        <View>
          <QuoteContainer />
          <PopularContainer />
          <Top20Container />
          <ArtistContainer />
        </View>
      )
  }
}

export default ExpensiveContainer;
