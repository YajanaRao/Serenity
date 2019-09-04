import * as React from 'react';
import { withTheme, Title, Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NetNotify from '../../components/NetNotify';
import Top20 from '../../data/top20.json';
import Artist from '../../data/artist.json';
import Recent from '../../components/Recent';
import Quote from '../../components/Quote';
import Popular from '../../components/Popular';



class MainScreen extends React.PureComponent {

    static navigationOptions = ({ navigation, screenProps }) => {
        // header: null
        let currentTheme = screenProps.theme;
        return {
            headerTitle: 'Home',
            headerRight: (
                <IconButton
                    icon="settings"
                    onPress={() => navigation.navigate('Settings')}
                />
            ),
        }

    };

    navigateToSongs = (songs,artwork,title) => {
      this.props.navigation.navigate('Songs', {
        songs: songs,
        img: artwork,
        title: title,
    })
    }

    render() {
        const { colors } = this.props.theme

        const { navigate } = this.props.navigation;

        return (
          <ScrollView
            style={{flex: 1, backgroundColor: colors.background}}>
            <View>
              {/* <FlatList
                        pagingEnabled={true}
                        horizontal={true}
                        data={Media}
                        keyExtractor={(item, index) => index.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View key={item.id} style={{ alignItems: 'center', width: Dimensions.get('window').width }}>
                                <ImageBackground style={{ width: '100%', height: 200, alignItems: 'center', justifyContent: 'center', borderRadius: 4 }} source={{ uri: item.artwork }}>
                                    <Title numberOfLines={1}>{item.album}</Title>
                                </ImageBackground>
                            </View>
                        }
                    /> */}
              <NetNotify />

              <Quote />

              <Recent/>
              <Popular navigate={this.navigateToSongs}/>

              <Title style={styles.title}>Top 15</Title>
              <FlatList
                horizontal={true}
                data={Top20}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      navigate('Songs', {
                        songs: item.songs,
                        img: item.artwork,
                        title: item.album,
                      })
                    }>
                    <FastImage
                      source={{uri: item.artwork}}
                      style={styles.photo}
                    />
                    <Paragraph numberOfLines={1}>
                      {item.album}
                    </Paragraph>
                  </TouchableOpacity>
                )}
              />

              <Title style={styles.title}>Popular Artist</Title>
              <FlatList
                horizontal={true}
                data={Artist}
                keyExtractor={(item, index) => index.toString()}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    style={styles.item}
                    onPress={() =>
                      navigate('Songs', {
                        songs: item.songs,
                        img: item.artwork,
                        title: item.album,
                      })
                    }>
                    <FastImage
                      source={{uri: item.artwork}}
                      style={styles.artist}
                    />
                    <Paragraph numberOfLines={1}>
                      {item.album}
                    </Paragraph>
                  </TouchableOpacity>
                )}
              />
            </View>
          </ScrollView>
        );
    }
}

export default withTheme(MainScreen);

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
    },
    cardWrapper: {
        width: 120,
        alignItems: 'center',
        margin: 4
    },
    artist: {
        width: 120,
        height: 120,
        borderRadius: 60,
        elevation: 1
    }
});