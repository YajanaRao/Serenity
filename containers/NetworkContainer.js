import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTheme, Banner, IconButton } from 'react-native-paper';
import { View } from 'react-native';
import { withNavigation } from 'react-navigation';

import { fetchNetInfo } from '../actions';

class NetworkContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isConnected: true,
            isLoaded: false
        }
        
    }
   componentWillReceiveProps(nextProps) {
        if (nextProps.isConnected !== this.state.isConnected) {
            this.setState({ isConnected: nextProps.isConnected })
        }
    }

    componentDidMount(){
        this.props.fetchNetInfo()
    }


    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1 }}>
                <Banner
                    visible={!this.state.isConnected}
                    actions={[
                        {
                            label: 'Fix it',
                            onPress: () => this.setState({ isConnected: true }),
                        },
                        {
                            label: 'Go offline',
                            onPress: () => navigate('Offline'),
                        },
                    ]}
                    image={({ size }) =>
                        <IconButton
                            icon="airplanemode-active"
                            size={size - 10}
                        />
                    }
                >
                    There is a problem with internet connection.
            </Banner>
                {React.cloneElement(this.props.children, { isConnected: this.state.isConnected && this.state.isLoaded })}
            </View>
        );
    }
}
const mapStateToProps = state => ({
    isConnected: state.settings.isConnected
});


export default connect(mapStateToProps, { fetchNetInfo })(withNavigation(withTheme(NetworkContainer)));