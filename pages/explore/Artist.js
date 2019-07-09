import React, { Component } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { withTheme, Avatar, List } from 'react-native-paper';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';
import Artists from '../../data/artist.json';

class Artist extends Component {
    static navigationOptions = {
        header: null
    }

    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

   

    render() {
        const { navigate } = this.props.navigation;
        const { colors } = this.props.theme;
        return (
            <View style={{ backgroundColor: colors.background, flex: 1 }}>
                <List.Item
                    title="Add artist"
                    left={props => <Avatar.Icon {...props} style={{ backgroundColor: colors.surface}} icon="add" />}
                />
                <FlatList
                    data={Artists}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <List.Item
                            title={item.artist}
                            left={props => <FastImage {...props} source={{ uri: item.artwork }} style={styles.icons} />}
                            onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                        />
                    )}
                />
               
                {/* <List.Item
                    title="Brodha V"
                    left={props => <FastImage {...props} source={{ uri: 'https://source.unsplash.com/collection/895539/200x200' }} style={styles.icons} />}
                /> */}
            </View>
        );
    }
}
export default withTheme(Artist);

const styles = StyleSheet.create({
    icons: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});