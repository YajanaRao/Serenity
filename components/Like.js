import React, { Component } from 'react';
import { IconButton, Colors, withTheme } from 'react-native-paper'; 
import { View } from 'react-native';
class Like extends Component {
    state = {
        selected: false
    }
    render() {

        const { colors } = this.props.theme;
        return (
            <View style={this.props.style}>
                <IconButton
                    icon="thumb-up"
                    onPress={() => this.setState(prev => ({ selected: !prev.selected }))}
                    color={this.state.selected ? Colors.red500 : colors.accent}
                    size={20}
                />
            </View>
        );
    }
}

export default withTheme(Like);