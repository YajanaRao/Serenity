import React, { Component } from 'react';
import { View } from 'react-native';
import { List } from 'react-native-paper';

class Playlist extends Component {
    render() {
        return (
            <View>
                <List.Item
                    title="Create Playlist"
                    left={props => <List.Icon {...props} icon="add" />}
                />
                <List.Item
                    title="Favorite"
                    description="25 Favorite Songs"
                    left={props => <List.Icon {...props} icon="favorite" />}
                />
                <List.Item
                    title="My Fav"
                    description="by you"
                    left={props => <List.Icon {...props} icon="audiotrack" />}
                />
            </View>
        );
    }
}

export default Playlist;