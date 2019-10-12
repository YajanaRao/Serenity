import React, {PureComponent} from 'react';
import {Banner, IconButton} from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';
import {withNavigation} from 'react-navigation';
import PropTypes from 'prop-types';

class NetNotify extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
    };
    this.unsubscribe;
  }

  componentDidMount() {
    this.unsubscribe = NetInfo.addEventListener(state => {
      this.handleConnectivityChange(state);
    });
  }

  checkNetInfo = () => {
    NetInfo.fetch().then(state => {
      this.setState({
        isConnected: state.isConnected,
      });
    });
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = state => {
    this.setState({
      isConnected: state.isConnected,
    });
  };

  render() {
    const {navigate} = this.props.navigation;

    return (
      <Banner
        visible={!this.state.isConnected}
        actions={[
          {
            label: 'Retry',
            onPress: () => this.checkNetInfo(),
          },
          {
            label: 'Go offline',
            onPress: () => navigate('Offline'),
          },
        ]}
        image={({size}) => (
          <IconButton
            icon="cloud-off"
            // size={size}
            // size={20}
            // onPress={() => console.log('Pressed')}
          />
        )}>
        Your network is unavailable. Check your data or wifi connection.
      </Banner>
    );
  }
}

NetNotify.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default withNavigation(NetNotify);
