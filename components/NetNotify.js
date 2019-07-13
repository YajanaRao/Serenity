import React, { Component } from 'react';
import { Banner, IconButton } from 'react-native-paper';
import NetInfo from "@react-native-community/netinfo";
import { withNavigation } from 'react-navigation';

class NetNotify extends Component {
    state = {
        isConnected: true
    };


    componentDidMount() {
        // NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        NetInfo.addEventListener(state => {
            this.setState({
                isConnected: state.isConnected
            })
        });
        // this.checkNetInfo();
    }

    checkNetInfo = () => {
        NetInfo.fetch().then(state => {
            console.log("Is connected?", state.isConnected);
            this.setState({
                isConnected: state.isConnected
            })
        });
    }

    componentWillUnmount(){
        NetInfo.removeEventListener(state => {
            console.log("Connection type", state.type);
            console.log("Is connected?", state.isConnected);
            this.setState({
                isConnected: state.isConnected
            })
        });
    }

    handleConnectivityChange = (state) => {
        this.setState({
            isConnected: state.isConnected
        })
    }

    render() {
        const { navigate } = this.props.navigation;

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
                image={({ size }) =>
                    <IconButton
                        icon="cloud-off"
                        // size={size}
                        // size={20}
                        // onPress={() => console.log('Pressed')}
                    />
                }
            >
                Your network is unavailable. Check your data or wifi connection.
      </Banner>
        );
    }
}

export default withNavigation(NetNotify);