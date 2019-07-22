import React, { PureComponent } from 'react';
import { withTheme, List } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import isEqual from 'lodash/isEqual';
import { playMedia, addToQueue } from '../actions/playerState';

/*
    TODO: 
    - Animation to remove an item from the list
    - may not be required for all render 
    - Adding duration would enhance the user experience
    - Testing has to be done
*/ 
// FIXME: Testing the application
class Track extends PureComponent {


    renderRightIcon = (props) => {
        const {
            track,
            active
        } = this.props;
        if (isEqual(active, track)) {
            const { colors } = this.props.theme;
            return <List.Icon {...props} icon="equalizer" color={colors.accent} />
        }
        return false;
    }

    play = () => {
        const {
            track,
            active
        } = this.props;
        if(active){
            if (isEqual(active, track)) {
                return false
            }
        }
        this.props.playMedia(track);
    }



    render() {
        const {
            track
        } = this.props;

        const { colors } = this.props.theme;

        return (
            <View style={[styles.surface, { backgroundColor: colors.background }]}>
                <List.Item
                    item={track}
                    title={track.title}
                    description={ track.artist ? track.artist : track.album }
                    right={props => this.renderRightIcon(props)}
                    onPress={() => this.play()}
                />
            </View>
        );
        
    }
}

const mapStateToProps = state => ({
    active: state.playerState.active
});

export default connect(mapStateToProps, { playMedia, addToQueue })(withTheme(Track));

const styles = StyleSheet.create(
    {
        icons: {
            width: 50,
            borderRadius: 4
        },
        surface: {
            padding: 0,
            margin: 0,
            borderRadius: 4
        }
    });