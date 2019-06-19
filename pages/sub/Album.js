import * as React from 'react';
import { Title, withTheme, Subheading } from 'react-native-paper';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
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
                    <FlatList
                        data={Media}
                        numColumns={3}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item}) => (
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                            >
                                <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                {/* <Subheading style={styles.title} numberOfLines={1}>{item.album}</Subheading> */}
                            </TouchableOpacity>
                        )}
                    />
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

class AlbumScreen extends React.PureComponent {
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
        width: Dimensions.get('window').width / 3,
        // padding: 4,
    },
    photo: {
        height: 150,
        justifyContent: 'center',
        alignItems: 'center',
        // borderRadius: 8,
        // elevation: 4
    },
    title: {
        textAlign: 'center'
    }
});