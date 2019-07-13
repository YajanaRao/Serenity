import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList } from 'react-native';
import {  withTheme, Subheading, Title, Colors, TouchableRipple, Divider } from 'react-native-paper';
import { connect } from 'react-redux';
import _ from 'lodash';

import Genre from '../../data/genre.json';
import Header from '../../components/Header';
import Track from '../../components/Track';

class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: <Header/>
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            searchResult: []
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.searchResult, state.searchResult)) {
            return {
                searchResult: props.searchResult
            }
        }
        return null
    }


    render() {

        const { colors } = this.props.theme;
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>

                <FlatList
                    data={this.state.searchResult}
                    ItemSeparatorComponent={() => <Divider inset={true} />}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) =>
                        <Track track={item} swipeable={true} />
                    }
                />

                <Title style={styles.headline}>All Moods & Geners</Title>
                <View style={styles.container}>
                    <FlatList
                        data={Genre}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <TouchableRipple style={styles.item} onPress={() => navigate('Songs', { songs: [], img: item.image, title: item.title })}>
                                <Subheading style={{ color: 'white' }} numberOfLines={1}>{item.title}</Subheading>
                            </TouchableRipple>
                        }
                    />
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    searchResult: state.query.searchResult
});

export default connect(mapStateToProps)(withTheme(Search));

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        marginLeft: 5,
        marginRight: 5
    },
    searchbar: {
        margin: 10,
        // marginTop: Constants.statusBarHeight,
    },
    item: {
        // width: 150,
        backgroundColor: Colors.lightBlueA100,
        borderRadius: 4,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        margin: 4,
        elevation: 8
    },
    // photo: {
    //     borderRadius: 8,
    //     margin: 4
    // },
    headline: {
        textAlign: 'center',
    }
});