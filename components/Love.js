import React, { Component } from 'react';
import { View } from 'react-native';
import { IconButton, Colors, withTheme } from 'react-native-paper';
class Love extends Component {
    state = {
        selected: false
    }
    render() {

        const { colors } = this.props.theme;
        return (
            // <LinearGradient
            //     colors={['#ee0979', '#fc1c62', '#ff364a', '#ff512f', '#ff6a00']}
            //     // style={{ padding: 10, alignItems: 'center', borderRadius: 5 }}
            //     >
            <View style={this.props.style}>
                {this.state.selected ?
                    <IconButton
                        animated={true}
                        icon="favorite"
                        onPress={() => this.setState(prev => ({ selected: !prev.selected }))}
                        color={Colors.red500}
                    />
                    :
                    <IconButton
                        animated={true}
                        icon="favorite-border"
                        onPress={() => this.setState(prev => ({ selected: !prev.selected }))}
                    />
                }

            </View>
        );
    }
}

export default withTheme(Love);