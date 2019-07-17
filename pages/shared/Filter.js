import React, { Component } from 'react';
import { View, ScrollView, FlatList, StyleSheet, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Title, Button, withTheme, IconButton, Divider , Surface} from 'react-native-paper';
import _ from 'lodash';
import { connect } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';

import Track from '../../components/Track';
import { addToQueue, addToFavorite } from '../../actions/playerState';
import { filterAlbumSongs, filterArtistSongs } from '../../actions/mediaStore';

class Filter extends Component {
    static navigationOptions = ({ navigation }) => {
        // header: null
        return {
            headerTitle: navigation.getParam('title'),
            headerRight: (
                <IconButton
                    icon="play-circle-outline"
                    onPress={navigation.getParam('addToQueue')}
                />
            )
        }

    };


    constructor(props) {
        super(props);
        this.state = {
            files: [],
            refreshing: false
        }
    }

    addToQueue = () => {
        this.props.addToQueue(this.state.files);
    }

    static getDerivedStateFromProps(props, state) {
        if (!_.isEqual(props.files, state.files) || state.refreshing) {
            return {
                files: props.files,
                refreshing: false
            }
        }
        return null
    }

    fetchData = () => {
        this.setState({
            refreshing: true
        })
        const { navigation } = this.props;

        const album = navigation.getParam('album', null);
        const artist = navigation.getParam('artist', null);
        const image = navigation.getParam('img')

        if (artist) {
            this.props.filterArtistSongs(artist, image)
        } else if (album) {
            this.props.filterAlbumSongs(album, image)
        }
    }

  
    componentDidMount() {
        this.fetchData();
        this.props.navigation.setParams({ addToQueue: this.addToQueue });
    }

    render() {
        const { colors } = this.props.theme; 
        const { navigation } = this.props;

        const albumImage = navigation.getParam('img');
        const title = navigation.getParam('title', 'No Title');

        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView 
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => this.fetchData()}
                        />
                    }
                >

                    <View style={styles.scrollViewContent}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
                            { albumImage ?
                                <FastImage source={{ uri: albumImage }} style={{ width: 200, height: 200 }} />
                                :
                                <FastImage
                                    source={require('../../assets/app-icon.png')}
                                    style={{ width: 200, height: 200 }}
                                />
                            }
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                            <Title>{title}</Title>
                        </View>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 8 }}>
                            {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                            Download
                        </Button> */}
                            <Button
                                mode="contained"
                                onPress={() => this.props.addToQueue(this.state.files)}>
                                Play All
                        </Button>
                        </View>
                        <SwipeListView
                            data={this.state.files}
                            ItemSeparatorComponent={() => <Divider inset={true} />}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) => (
                                <Track track={item} />
                            )}
                            renderHiddenItem={({ item }) => (
                                <Surface style={styles.rowBack}>
                                    <IconButton
                                        icon="add-to-queue"
                                        onPress={() => this.props.addToQueue(item)}
                                    />
                                    <IconButton
                                        icon="favorite"
                                        onPress={() => this.props.addToFavorite(item)}
                                    />
                                </Surface>
                            )}
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={() => this.fetchData()}
                                />
                            }
                            leftOpenValue={75}
                            rightOpenValue={-75}
                        />
                        {/* <FlatList
                            data={this.state.files}
                            
                            renderItem={({ item }) =>
                                <Track track={item} />
                            }
                        /> */}
                        <View style={{ height: 100 }} />
                    </View>

                </ScrollView>
          </View>
        
        );
    }
} 

const mapStateToProps = state => ({
    files: state.mediaStore.files
})

export default connect(mapStateToProps, { addToQueue, filterAlbumSongs, filterArtistSongs, addToFavorite })(withTheme(Filter));

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        scrollViewContent: {
            marginTop: 10
        },
        rowBack: {
            alignItems: 'center',
            // backgroundColor: '#DDD',
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingLeft: 15,
            paddingRight: 15
        },
    });