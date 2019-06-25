import * as React from 'react';
import { List, withTheme, DarkTheme } from 'react-native-paper';
import { StyleSheet, Dimensions, ScrollView, TouchableOpacity, View, FlatList } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import FastImage from 'react-native-fast-image';

import Media from '../../data/media.json';
import SongScreen from '../shared/Songs';


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
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) => (
                            <List.Item
                                title={item.album}
                                description={item.artist}
                                left={props => (
                                    <FastImage {...props} source={{ uri: item.artwork }} style={styles.icons} />
                                )}
                                // onPress={() => this.play()}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                            />
                        )}
                    />
                 
                    {/* <FlatList
                        data={Media}
                        numColumns={3}
                        keyExtractor={(item,index) => index.toString()}
                        renderItem={({item}) => (
                           
                            <TouchableOpacity
                                style={styles.item}
                                onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}
                            >
                                <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                            </TouchableOpacity>
                        )}
                    /> */}
                </ScrollView>
           </View>
        );
    }
}


const AlbumNavigation =  createStackNavigator({
    Albums: { screen: withTheme(AlbumGallery) },
    Songs: { screen: SongScreen }
},
{
    initialRouteName: 'Albums',
    /* The header config from HomeScreen is now here */
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

AlbumNavigation.navigationOptions = ({ navigation }) => {
    let tabBarVisible = true;
    if (navigation.state.index > 0) {
        tabBarVisible = false;
    }

    return {
        tabBarVisible,
    };
};

export default withTheme(AlbumNavigation);

const styles = StyleSheet.create({
    content: {
        // flexDirection: 'row',
        // flexWrap: 'wrap',
        padding: 4,
    },
    item: {
        flex: 1,
        // padding: 4,
    },
    icons: {
        width: 50,
        borderRadius: 4
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