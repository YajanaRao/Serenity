import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { Searchbar, List, withTheme, Card, Subheading, Title, Surface, Colors, TouchableRipple, DarkTheme } from 'react-native-paper';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation';

import Genre from '../../data/genre.json';
import { updateQuery, playMedia, fetchJioSavanData } from '../../actions';
import ImageBackground from '../../containers/ImageBackground';
import Songs from '../shared/Songs';


class Search extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: (
              <View style={{ backgroundColor: DarkTheme.colors.background}}>
                    <Searchbar
                        placeholder="Artists, songs or podcasts"
                        onChangeText={(text) => { this.props.updateQuery(text) }}
                        value={navigation.getParam('query')}
                        // onIconPress={() => this.props.navigation.toggleDrawer()}
                        icon="search"
                        style={styles.searchbar}
                    />
              </View>
            )
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            query: null
        }
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.query) {
            this.setState({
                query: nextProps.query
            })
        }
    }
    componentDidMount() {
        this.props.navigation.setParams({ query: this.state.query });
    }

    // filterMatchingSongs = (query) => {
    //     const result = []
    //     if (query) {
    //         Media.map(function (item) {
    //             if (item) {
    //                 item.songs.map(function (songs) {
    //                     if (songs.title.includes(query)) {
    //                         result.push(songs)
    //                     }
    //                 })
    //             }
    //         })
    //     }
    //     return(result);
    // }

    // filterMatchingAlbums = (query) => {
    //     const result = []
    //     if (query) {
    //         Media.map(function (item) {
    //             if (item.album.includes(query)) {
    //                 result.push(item)
    //             }
    //         })
    //     }
    //     return (result);
    // }

    render() {
        // const filteredSongs = this.filterMatchingSongs(this.state.query)
        // const filteredAlbums = this.filterMatchingAlbums(this.state.query)
        // const SONGS = filteredSongs.map((songs) =>
        //     <List.Item
        //         key={songs.title.toString()}
        //         title={songs.title}
        //         description={songs.description}
        //         left={props => <FastImage source={{ uri: songs.img }} style={{ width: '20%', borderRadius: 2 }} />}
        //         onPress={() => this.props.playMedia(songs)}
        //     />
        // );

        // const ALBUMS = filteredAlbums.map((album) => 
        //     <List.Item
        //         key={album.album.toString()}
        //         title={album.album}
        //         description={album.artist}
        //         left={props => <FastImage source={{ uri: album.img }} style={{ width: '20%', borderRadius: 2 }} />}
        //         onPress={() => this.props.playMedia(album)}
        //     />
        // );
        const { colors } = this.props.theme; 
        const { navigate } = this.props.navigation;
        return (
            <ScrollView style={{ flex: 1, backgroundColor: colors.background }}>
               
                <Title style={styles.headline}>All Moods & Geners</Title>
                <View style={styles.container}>
                    <FlatList
                        data={Genre}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <TouchableRipple style={styles.item} onPress={() => navigate('Songs', { songs: [], img: 'https://source.unsplash.com/1600x900/?'+ item.title, title: item.title })}>
                                <Subheading style={{ color: 'white' }} numberOfLines={1}>{item.title}</Subheading>
                            </TouchableRipple>
                        }
                    />
                </View>
                {/* { filteredSongs.length ? <Headline style={{ margin: 4 }}>Songs</Headline> : false }
                {SONGS}
                { filteredAlbums.length ? <Headline style={{ margin: 4 }}>Albums</Headline> : false }
                {ALBUMS} */}
            </ScrollView>
        );
    }
}

const GenreNavigation = createStackNavigator({
    Search: { screen: withTheme(Search) },
    Songs: { screen: Songs }
},
    {
        initialRouteName: 'Search',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: DarkTheme.colors.surface,
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: DarkTheme.colors.text
            },
        },
    }
);

GenreNavigation.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};



const mapStateToProps = state => ({
    query: state.query.query
});

export default connect(mapStateToProps, { updateQuery, playMedia, fetchJioSavanData })(GenreNavigation);

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