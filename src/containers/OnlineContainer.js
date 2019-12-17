import React, { PureComponent } from 'react';
import NetInfo from '@react-native-community/netinfo';
import { QuoteContainer } from './QuoteContainer';

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
      return <QuoteContainer load={isConnected} />;
    }
    return false;
  }
}

export default OnlineContainer;
