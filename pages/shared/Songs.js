import React, { Component } from 'react';
import { IconButton, Divider,  withTheme, Title, Button } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { connect } from 'react-redux';
import _ from 'lodash';

import { addToQueue } from '../../actions/playerState';
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
        const albumImage = navigation.getParam('img', 'https://source.unsplash.com/collection/4799534/120x120');
        const title = navigation.getParam('title', 'No Title');

       
        const { colors } = this.props.theme; 
       
        return (  
            <View style={[styles.container, { backgroundColor: colors.background }]}>
                <ScrollView>
                    <View style={styles.scrollViewContent}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', elevation: 4 }}>
                            {/* <Card.Cover source={{ uri: albumImage }} style={{ width: 250, height: 250, borderRadius: 4 }} /> */}
                            <FastImage source={{ uri: albumImage }} style={{ width: 200, height: 200, backgroundColor: '#f7b71d' }} />
                            {/* <Headline style={styles.title}>{title}</Headline> */}
                        </View>
                        <View style={{ alignItems: 'center', justifyContent: 'center', margin: 10 }}>
                            <Title>{title}</Title>
                        </View>
                        {_.isEmpty(songs) ? null :
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', marginBottom: 8 }}>
                                {/* <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button> */}
                                <Button
                                    mode="contained"
                                    onPress={() => this.props.addToQueue(songs)}>
                                    Play All
                            </Button>
                            </View>
                        }
                        <FlatList
                            data={songs}
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



export default connect(null, { addToQueue })(withTheme(Songs));

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