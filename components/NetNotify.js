import React, { Component } from 'react';
import { Banner, IconButton } from 'react-native-paper';
import { NetInfo } from 'react-native';
import { withNavigation } from 'react-navigation';

class NetNotify extends Component {
    state = {
        isConnected: true
    };


    componentWillMount() {
        NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        this.checkNetInfo();
    }

    checkNetInfo = () => {
        NetInfo.getConnectionInfo().then((connectionInfo) => {
            console.log(
                'Initial, type: ' +
                connectionInfo.type +
                ', effectiveType: ' +
                connectionInfo.effectiveType,
            );
            if (connectionInfo.type == 'none') {
                this.setState({
                    isConnected: false
                })
            }
        });
    }

    componentWillUnmount(){
        NetInfo.removeEventListener(
            'connectionChange',
            this.handleFirstConnectivityChange,
        );
    }

    handleFirstConnectivityChange = (connectionInfo) => {
        console.log(
            'First change, type: ' +
            connectionInfo.type +
            ', effectiveType: ' +
            connectionInfo.effectiveType,
        );
        if(connectionInfo.type == 'none'){
            this.setState({
                isConnected: false
            })
        }else {
            this.setState({
                isConnected: true
            })
        }
        
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