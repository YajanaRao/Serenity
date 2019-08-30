import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { IconButton, withTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import includes from 'lodash/includes';

import { addToFavorite, removeFromFavorite } from '../actions/playerState';

class Love extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            favorite: false
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (includes(props.favorite, props.track) !== state.favorite) {
            return {
                favorite: !state.favorite
            }
        }
        return null;
    }

    


    addToFavorite = () => {
        this.props.addToFavorite(this.props.track)
        this.setState(prev => ({ favorite: !prev.favorite }))
    }

    removeFromFavorite = () => {
        this.props.removeFromFavorite(this.props.track)
        this.setState(prev => ({ favorite: !prev.favorite }))
    }

    render() {

        const { colors } = this.props.theme;
        return (
            <View style={this.props.style}>
                {this.state.favorite ?
                    <IconButton
                        animated={true}
                        icon="favorite"
                        onPress={this.removeFromFavorite}
                        color={colors.error}
                    />
                    :
                    <IconButton
                        animated={true}
                        icon="favorite-border"
                        onPress={this.addToFavorite}
                    />
                }

            </View>
        );
    }
}

const mapStateToProps = state => ({
    favorite: state.playerState.favorite
});

export default connect(mapStateToProps, { addToFavorite, removeFromFavorite })(withTheme(Love));