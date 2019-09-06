import * as React from 'react';
import { withTheme, Title, Paragraph, IconButton } from 'react-native-paper';
import { StyleSheet, View, ScrollView, FlatList } from 'react-native';
import FastImage from 'react-native-fast-image';
import { TouchableOpacity } from 'react-native-gesture-handler';

import NetNotify from '../../components/NetNotify';
import Top20Container from '../../containers/Top20Container';
import ArtistContainer from '../../containers/ArtistContainer';
import RecentContainer from '../../containers/RecentContainer';
import QuoteContainer from '../../containers/QuoteContainer';
import PopularContainer from '../../containers/PopularContainer';



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



    render() {
        const { colors } = this.props.theme

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

              <QuoteContainer />

              <RecentContainer/>
              <PopularContainer/>

              <Top20Container/>

             <ArtistContainer/>
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

});