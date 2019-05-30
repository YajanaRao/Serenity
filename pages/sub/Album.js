import * as React from 'react';
import { Card, Title, withTheme } from 'react-native-paper';
import { View, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import Media from '../../data/media.json';
import SongScreen from '../../components/PlayList';
import FastImage from 'react-native-fast-image';


class AlbumGallery extends React.Component {
    static navigationOptions = {
        header: null
    }
    render() {

        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        const { navigate } = this.props.navigation;

        return (
            <View style={{ flex: 1, backgroundColor: background }}>
               <ScrollView contentContainerStyle={styles.content}>
                {Media.map(item => (
                        <View key={item.id} style={styles.item}>
                            <Card
                                style={styles.card}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                            >
                                <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                <Title style={styles.title} numberOfLines={1}>{item.album}</Title>
                            </Card>
                        </View>
                    ))}
                </ScrollView>
           </View>
        );
    }
}


const GalleryNavigator = createStackNavigator({
    Albums: { screen: withTheme(AlbumGallery) },
    Songs: { screen: SongScreen },
});


const GalleryContainer = createAppContainer(GalleryNavigator);

class AlbumScreen extends React.Component {
    render() {
        return <GalleryContainer />;
    }
}

export default withTheme(AlbumScreen);

const styles = StyleSheet.create({
    content: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        padding: 4,
    },
    item: {
        // height: Dimensions.get('window').width / 2,
        width: '50%',
        padding: 4,
    },
    photo: {
        height: Dimensions.get('window').width / 2,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4
    },
    title: {
        textAlign: 'center'
    }
});