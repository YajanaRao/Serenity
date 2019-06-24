import React, { Component } from 'react';
import { IconButton, Divider, Headline, withTheme, Button, Card, Title } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';

import { addToQueue } from '../../actions';
import Track from '../../components/Track';

class Songs extends Component {

    static navigationOptions = ({ navigation }) =>  {
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

    addToQueue = () => {
        this.props.addToQueue(this.props.navigation.getParam('songs'));
    }

    componentDidMount() {
        this.props.navigation.setParams({ addToQueue: this.addToQueue });
    }


    render() {

        const { navigation } = this.props;

        const songs = navigation.getParam('songs', []);
        const albumImage = navigation.getParam('img', 'https://facebook.github.io/react-native/docs/assets/favicon.png');
        // const title = navigation.getParam('title', 'No Title');

       
        const { colors } = this.props.theme; 
       
             // contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
        return (
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                {/* <View
                    style={[
                        styles.bar,
                        {
                            backgroundColor: colors.background
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
                    <Title style={styles.title}>{title}</Title>
                    <View style={{ zIndex: 10 }}>
                        <IconButton
                            icon="play-circle-outline"
                            onPress={() => this.props.addToQueue(songs)}
                        // size={40}

                        />
                    </View>
                </View> */}
                <ScrollView>
                   
                    <View style={styles.scrollViewContent}>
                        <View style={{ justifyContent: 'center',  alignItems: 'center' }}>
                            {/* <Card.Cover source={{ uri: albumImage }} style={{ width: 250, height: 250, borderRadius: 4 }} /> */}
                            <FastImage source={{ uri: albumImage }} style={{ width: 200, height: 200 }} />
                            {/* <Headline style={styles.title}>{title}</Headline> */}
                        </View>
                      
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', flex: 1, margin: 16 }}>
                            {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button> */}
                            <Button 
                                // icon="play-circle-outline" 
                                mode="contained" onPress={() => this.props.addToQueue(songs)}>
                                Play All
                            </Button>
                        </View>
                        <FlatList
                            data={songs}
                            ItemSeparatorComponent={() => <Divider inset={true} />}
                            keyExtractor={(item) => item.id }
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



export default connect(null, { addToQueue })(withTheme(Songs));

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
            marginTop: 10
            // iOS uses content inset, which acts like padding.
            // paddingTop: ,

        },
    });