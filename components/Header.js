import React, { Component } from 'react';
import { withTheme, Searchbar } from "react-native-paper";
import { View } from 'react-native';
import { connect } from 'react-redux';

import { updateQuery } from '../actions/mediaStore';

class Header extends Component {

    state = {
        query: ''
    }

    handleChange = (text) => {
        this.setState({ query: text }); 
        this.props.updateQuery(text)
    }
    

    render() {
        const { colors } = this.props.theme;

        return (
            <View style={{ backgroundColor: colors.background }}>
                <Searchbar
                    placeholder="Artists, songs or podcasts"
                    onChangeText={(text) => this.handleChange(text)}
                    value={this.state.query}
                    icon="search"
                    style={{ margin: 10 }}
                />
            </View>
        )
    }
}


export default connect(null, { updateQuery })(withTheme(Header));