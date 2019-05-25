import * as React from 'react';
import { Card, Title, withTheme } from 'react-native-paper';
import { View, ImageBackground, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';


import Media from '../../data/media.json';
import SongScreen from '../../components/PlayList';

class AlbumGallery extends React.Component {
    static navigationOptions = {
        header: null
    };

    render() {
        const { navigate } = this.props.navigation;

        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        return (
            <View style={{ flex: 1, backgroundColor: background }}>
                <ScrollView contentContainerStyle={styles.content}>
                    {Media.map(item => (
                        <View key={item.id} style={styles.item}>
                            <Card
                                style={styles.card}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.img, title: item.album })}
                            >
                                <ImageBackground source={{ uri: item.img }} style={styles.photo} imageStyle={{ borderRadius: 2 }}>
                                    {/* <Text>Inside</Text> */}
                                    {/* <Card.Cover source={{ uri }} /> */}
                                    <Card.Content>
                                        <Title style={styles.title} numberOfLines={1}>{item.album}</Title>
                                        {/* <Paragraph>
              This is a pressable chameleon. If you press me, I will alert.
            </Paragraph> */}
                                    </Card.Content>
                                </ImageBackground>

                            </Card>

                            {/* <Image source={{ uri }} style={styles.photo} />
          <Text>{uri}</Text> */}
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
        flex: 1,
        height: Dimensions.get('window').width / 2,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    title: {
        color: 'white',
        fontWeight: 'bold'
    }
});