import React, {PureComponent} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {ActivityIndicator} from 'react-native-paper';
import {View} from 'react-native';
import Tree from '../components/Tree';

class OnlineContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      isLoaded: false,
    };
    this.unsubscribe;
  }

  componentDidMount() {
      NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
        isLoaded: true
      });
      if(!state.isConnected){
        this.unsubscribe = NetInfo.addEventListener(state => {
            this.handleConnectivityChange(state);
        });
      }
    });
  }

  

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <ActivityIndicator />
        </View>
      );
    }
    return this.state.isConnected ? this.props.children : <Tree message="You must be offline"/>;
  }
}

export default OnlineContainer;
