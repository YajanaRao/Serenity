import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, FlatList, Dimensions } from 'react-native';
import { Searchbar, List, Headline, Card, Subheading, Title } from 'react-native-paper';
import { withNavigation } from 'react-navigation';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

import Genre from '../../data/genre.json';
import { updateQuery, playMedia, fetchJioSavanData } from '../../actions';
import ImageBackground from '../../containers/ImageBackground';


class Search extends Component {
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

        return (
            <ScrollView style={{ flex: 1, margin: 8 }}>
                <Searchbar
                    placeholder="Artists, songs or podcasts"
                    onChangeText={(text) => { this.props.updateQuery(text) }}
                    value={this.state.query}
                    // onIconPress={() => this.props.navigation.toggleDrawer()}
                    icon="search"
                    style={styles.searchbar}
                />
                <Title style={styles.headline}>All Moods & Geners</Title>
                <View style={styles.container}>
                    <FlatList
                        data={Genre}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        renderItem={({ item }) =>
                            <ImageBackground style={styles.item} source={{ uri: item.image }} imageStyle={styles.photo}>
                                {/* <FastImage
                                    source={{ uri: item.image }}
                                    style={styles.photo}
                                    // onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                                /> */}
                                <Subheading style={{ color: 'white' }} numberOfLines={1}>{item.title}</Subheading>
                            </ImageBackground>
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


const mapStateToProps = state => ({
    query: state.query.query
});

export default connect(mapStateToProps, { updateQuery, playMedia, fetchJioSavanData })(withNavigation(Search));

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 4,
        marginLeft: 5,
        marginRight: 5
    },
    searchbar: {
        margin: 10,
        // marginTop: Constants.statusBarHeight,
    },
    item: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: 100,
        height: 100,
        // elevation: 8
    },
    // photo: {
    //     borderRadius: 8,
    //     margin: 4
    // },
    headline: {
        textAlign: 'center',
    }
});