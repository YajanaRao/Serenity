import React, { Component } from 'react';
import RNAndroidAudioStore  from "react-native-get-music-files";
import { View, ScrollView, FlatList, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Title, Button, withTheme, IconButton, Divider } from 'react-native-paper';
import _ from 'lodash';
import { connect } from 'react-redux';

import Track from '../../components/Track';
import { addToQueue } from '../../actions';

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
            isFetched: false
        }
    }

    addToQueue = () => {
        this.props.addToQueue(this.state.files);
    }

  
    componentDidMount() {
        const { navigation } = this.props;

        const album = navigation.getParam('album', null);
        const artist = navigation.getParam('artist', null);

        if(album){
            RNAndroidAudioStore.getSongs({
                album: album
            })
                .then(media => {
                    _.map(media, function (item) {
                        item.url = "file://" + item.path
                        delete item.path
                        item.artwork = navigation.getParam('img')
                        return item
                    });
                    this.setState({
                        files: media,
                    });
                })
                .catch(er => console.log(er));
        }

        else if (artist) {
            RNAndroidAudioStore.getSongs({
                artist: artist
            })
            .then(media => {
                _.map(media, function (item) {
                    item.url = "file://" + item.path
                    delete item.path
                    item.artwork = navigation.getParam('img')
                    return item
                });
                this.setState({ 
                    files: media
                });
            })
            .catch(er => console.log(er));
        }
        

        this.props.navigation.setParams({ addToQueue: this.addToQueue });
    }

    render() {
        const { colors } = this.props.theme; 

        const { navigation } = this.props;

        
        

        const albumImage = navigation.getParam('img');
        const title = navigation.getParam('title', 'No Title');


        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView>

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
                        <FlatList
                            data={this.state.files}
                            ItemSeparatorComponent={() => <Divider inset={true} />}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <Track track={item} />
                            }
                        />
                        <View style={{ height: 100 }} />
                    </View>

                </ScrollView>
          </View>
        
        );
    }
} 

export default connect(null, { addToQueue })(withTheme(Filter));

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        scrollViewContent: {
            marginTop: 10
            // iOS uses content inset, which acts like padding.
            // paddingTop: ,

        },
    });