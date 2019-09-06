import * as React from 'react';
import { List, withTheme } from 'react-native-paper';
import { StyleSheet, ScrollView, View, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';


class Album extends React.Component {
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
                    {/* <FlatList
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
                    /> */}
                </ScrollView>
           </View>
        );
    }
}


export default withTheme(Album);

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