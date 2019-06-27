import React, { Component } from 'react';
import { View } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';

import { addToFavorite, removeFromFavorite } from '../actions';

class Love extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: false
        }
    }

    
    componentWillReceiveProps(nextProps) {
        if (nextProps.favorite !== this.state.selected) {
            this.setState({ selected: true });
        }
    }

    addToFavorite = () => {
        this.props.addToFavorite(this.props.track)
        this.setState(prev => ({ selected: !prev.selected }))
    }

    removeFromFavorite = () => {
        this.props.removeFromFavorite(this.props.track)
        this.setState(prev => ({ selected: !prev.selected }))
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
                        onPress={() => this.removeFromFavorite()}
                        color={colors.error}
                    />
                    :
                    <IconButton
                        animated={true}
                        icon="favorite-border"
                        onPress={() => this.addToFavorite()}
                    />
                }

            </View>
        );
    }
}

const mapStateToProps = state => ({
    favorite: state.media.favorite
});

export default connect(mapStateToProps, { addToFavorite, removeFromFavorite })(withTheme(Love));