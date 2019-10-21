import React, { PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { View } from 'react-native';
import Tree from '../components/Tree';
import ExpensiveContainer from './ExpensiveContainer';

class OnlineContainer extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: false,
    };
    this.unsubscribe = null;
  }

  componentDidMount() {
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
      if (!state.isConnected) {
        this.unsubscribe = NetInfo.addEventListener(state => {
          this.handleConnectivityChange(state);
        });
      }
    });
  }

  componentWillUnmount() {
    if (this.unsubscribe !== null) {
      this.unsubscribe();
    }
  }

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  render() {
    const { isConnected } = this.state;
    if (isConnected) {
      return <ExpensiveContainer load={isConnected} />;
    }
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Tree message="Waiting for data" />
      </View>
    );
  }
}

export default OnlineContainer;
