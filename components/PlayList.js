import React, { Component } from 'react';
import { IconButton, Divider, Headline, withTheme, Button, Card } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import Track from './Track';
import { addToQueue } from '../actions';
import { connect } from 'react-redux';



class Songs extends Component {

    static navigationOptions = {
        header: null
    };

    render() {

        const { navigation, active } = this.props;

        const songs = navigation.getParam('songs', []);
        const albumImage = navigation.getParam('img', 'https://facebook.github.io/react-native/docs/assets/favicon.png');
        const title = navigation.getParam('title', 'No Title');

        const {
            theme: {
                colors: { background },
            },
        } = this.props;

       

       
             // contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
        return (
            <View style={[styles.container, { backgroundColor: background }]}>
                <View
                    style={[
                        styles.bar,
                        {
                            backgroundColor: background
                        }
                    ]}
                >
                    <View style={{ zIndex: 10 }}>
                        <IconButton
                            icon="keyboard-arrow-left"
                            onPress={() => navigation.goBack()}
                            size={30}
                        />
                    </View>
                    {/* <Headline style={styles.title}>{title}</Headline> */}
                    <View style={{ zIndex: 10 }}>
                        <IconButton
                            icon="play-circle-outline"
                            onPress={() => this.props.addToQueue(songs)}
                        // size={40}

                        />
                    </View>
                </View>
                <ScrollView>
                   
                    <View style={styles.scrollViewContent}>
                        <View style={{ justifyContent: 'center',  alignItems: 'center' }}>
                            <Card.Cover source={{ uri: albumImage }} style={{ width: 250, height: 250, borderRadius: 4 }} />
                            <Headline style={styles.title}>{title}</Headline>
                        </View>
                      
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1, margin: 8 }}>
                            <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button>
                            <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(songs)}>
                                Play All
                            </Button>
                        </View>
                        <FlatList
                            data={songs}
                            ItemSeparatorComponent={() => <Divider />}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <Track track={item} active={active} />
                            }
                        />
                        <View style={{ height: 100 }} />
                    </View>
                
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    active: state.media.active,
});

export default connect(mapStateToProps, { addToQueue })(withTheme(Songs));

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        bar: {
            zIndex: 10,
            flexDirection: 'row',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            // elevation: 1,
            justifyContent: 'space-between',
            alignItems: 'center'
        },
        scrollViewContent: {
            marginTop: 50
            // iOS uses content inset, which acts like padding.
            // paddingTop: ,

        },
    });