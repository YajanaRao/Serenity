import React from 'react';
import { withTheme, Paragraph, Title } from 'react-native-paper';
import { StyleSheet, View, TouchableOpacity, FlatList } from 'react-native';
import FastImage from "react-native-fast-image";
import Media from '../data/media.json';

const Popular = props => {

    return (
        <View>
            <Title style={styles.title}>Popular Albums</Title>
            <FlatList
                horizontal={true}
                data={Media}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => props.navigate(item.songs,item.artwork, item.album)}>
                        <FastImage
                            source={{ uri: item.artwork }}
                            style={styles.photo}
                        />
                        <Paragraph numberOfLines={1}>
                            {item.album}
                        </Paragraph>
                    </TouchableOpacity>
                )}
            />
        </View>
    );
};

export default withTheme(Popular);

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        textAlign: 'center'
    },
    item: {
        marginLeft: 12,
        marginBottom: 4,
        alignItems: 'center'
    },
    photo: {
        width: 120,
        height: 120,
        // borderRadius: 12,
        elevation: 1
    }
});
