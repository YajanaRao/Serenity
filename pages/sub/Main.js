import * as React from 'react';
import { withTheme, Title, Card, Paragraph, Caption, Avatar } from 'react-native-paper';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import FastImage from 'react-native-fast-image';

import HorizontalScrollViewContainer from '../../containers/HorizontalScrollViewContainer';
import Media from '../../data/media.json';
import Top20 from '../../data/top20.json';
import { 
    fetchTopAlbums, 
    fetchNapsterTopTracks, 
    fetchNapsterTopArtists, 
    fetchJioSavanData, 
    fetchKannadaTopSongs, 
    fetchBillboardHot100 
} from '../../actions';


const TitleContainer = (props) => {
    if (_.isEmpty(props.data)) {
        return false
    }
    return (
        <Title style={styles.title}>{props.text}</Title>
    )
}

class MainScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topAlbums: [],
            topTracks: [],
            topArtists: [],
            charts: [],
            newAlbums: [],
            topKannada: [],
            hot100: [],
            isConnected: false,
            isLoaded: false
        }
    }

    static navigationOptions = {
        header: null
    };

   
    componentWillReceiveProps(nextProps) {
        if (nextProps.topAlbums) {
            this.setState({
                topAlbums: nextProps.topAlbums
            })
        }
        if (nextProps.topTracks) {
            this.setState({
                topTracks: nextProps.topTracks
            })
        }
        if (nextProps.topArtists) {
            this.setState({
                topArtists: nextProps.topArtists
            })
        }
        if (nextProps.charts) {
            this.setState({
                charts: nextProps.charts
            })
        }
        if (nextProps.newAlbums) {
            this.setState({
                newAlbums: nextProps.newAlbums
            })
        }
        if(nextProps.topKannada) {
            this.setState({
                topKannada: nextProps.topKannada
            })
        }
        if(nextProps.hot100) {
            this.setState({
                hot100: nextProps.hot100
            })
        }
    }

    apiRequests = () => {
        if (!this.state.isLoaded) {
            this.props.fetchTopAlbums();
            this.props.fetchNapsterTopTracks();
            this.props.fetchNapsterTopArtists();
            // this.props.fetchJioSavanData("charts");
            // this.props.fetchJioSavanData("new_albums");
            this.props.fetchKannadaTopSongs();
            this.props.fetchBillboardHot100();
            this.setState({
                isLoaded: true
            })
        }
    }

    componentDidMount(){
        this.apiRequests();
    }

    render() {

        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        const { navigate } = this.props.navigation;

        return (
            <ScrollView style={{ flex: 1, backgroundColor: background }}>
                
                <View>
                    <Title style={styles.title}>Recents</Title>
                    <HorizontalScrollViewContainer
                        children={
                            Media.map(item => (
                                <View key={item.id} style={{ alignItems: 'center' }}>
                                    <Card style={styles.cardItem} onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}>
                                        <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                    </Card>
                                    <Paragraph numberOfLines={1}>{item.album}</Paragraph>
                                </View>
                            ))
                        }
                    />

                    <Title style={styles.title}>Top 15</Title>
                    <HorizontalScrollViewContainer
                        children={
                            Top20.map(item => (
                                <View key={item.id} style={{ alignItems: 'center' }}>
                                    <Card style={styles.cardItem} onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}>
                                        {/* <Card.Cover source={{ uri: item.artwork }} style={styles.photo} /> */}
                                        <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                    </Card>
                                    <Paragraph numberOfLines={1}>{item.album}</Paragraph>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Top Charts" data={this.state.charts} />
                    <HorizontalScrollViewContainer>
                        {this.state.charts.map((item) => (
                            <View key={item.listid} style={{ alignItems: 'center' }}>
                                <Card style={styles.saavanCard} onPress={() => console.log("clicked")}>
                                    <FastImage source={{ uri: item.image }} style={styles.photo} />
                                </Card>
                                <Paragraph style={{ flexWrap: 'wrap' }} numberOfLines={1}>{item.listname}</Paragraph>
                            </View>
                        ))}
                    </HorizontalScrollViewContainer>

                    <TitleContainer text="New Albums" data={this.state.newAlbums} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.newAlbums.map((item) => (
                                <View key={item.query} style={{ alignItems: 'center' }}>
                                    <Card style={styles.cardItem} onPress={() => console.log("clicked")}>
                                        <FastImage source={{ uri: item.image }} style={styles.photo} />
                                        <Card.Content>
                                            <Paragraph style={{ flexWrap: 'wrap' }} numberOfLines={1}>{item.title}</Paragraph>
                                        </Card.Content>
                                    </Card>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Top Albums" data={this.state.topAlbums} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.topAlbums.map((item, index) => (
                                <View key={index.toString()} style={{ alignItems: 'center' }}>
                                    <Card style={styles.cardItem} onPress={() => console.log("clicked")}>
                                        <FastImage source={{ uri: item.image[3]['#text'] }} style={styles.photo} />
                                        <Card.Content>
                                            <Paragraph style={{ flexWrap: 'wrap' }} numberOfLines={1}>{item.name}</Paragraph>
                                            <Caption numberOfLines={1}>{item.artist.name}</Caption>
                                        </Card.Content>
                                    </Card>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Top Artists" data={this.state.topArtists} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.topArtists.map((item, index) => (
                                <View key={index.toString()} style={{ alignItems: 'center' }}>
                                    <Avatar.Image size={120} source={{ uri: `https://api.napster.com/imageserver/v2/artists/${item.id}/images/300x300.jpg` }} style={{ margin: 8 }} />
                                    <Paragraph style={{ flexWrap: 'wrap' }}>{item.name}</Paragraph>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Top Tracks" data={this.state.topArtists} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.topTracks.map((item, index) => (
                                <View key={index.toString()} style={styles.cardWrapper}>
                                    <Card style={styles.napsterCard} onPress={() => navigate('Music', { albumId: item.albumId })}>
                                        <FastImage source={{ uri: `http://direct.rhapsody.com/imageserver/v2/albums/${item.albumId}/images/300x300.jpg` }} style={styles.photo} />
                                    </Card>
                                    <Paragraph style={{ flexWrap: 'wrap' }} numberOfLines={1}>{item.name}</Paragraph>
                                    <Caption numberOfLines={1}>{item.artistName}</Caption>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Billboard Hot 100" data={this.state.charts} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.hot100.map(item => (
                                <View key={item.id} style={{ alignItems: 'center' }}>
                                    <Card style={{ width: 86, height: 86, margin: 4 }} onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}>
                                        {/* <Card.Cover source={{ uri: item.artwork }} style={styles.photo} /> */}
                                        <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                    </Card>
                                    <Paragraph numberOfLines={1}>{item.title}</Paragraph>
                                </View>
                            ))
                        }
                    />

                    <TitleContainer text="Top Kannada" data={this.state.charts} />
                    <HorizontalScrollViewContainer
                        children={
                            this.state.topKannada.map(item => (
                                <View key={item.toString()} style={{ alignItems: 'center' }}>
                                    <Card style={styles.cardItem} onPress={() => navigate('Songs', { songs: item.songs, img: item.artwork, title: item.album })}>
                                        {/* <Card.Cover source={{ uri: item.artwork }} style={styles.photo} /> */}
                                        <FastImage source={{ uri: item.artwork }} style={styles.photo} />
                                    </Card>
                                    <Paragraph numberOfLines={1}>{item.album}</Paragraph>
                                </View>
                            ))
                        }
                    />


                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = state => ({
    topAlbums: state.dashboard.topAlbums,
    topTracks: state.dashboard.topTracks,
    topArtists: state.dashboard.topArtists,
    charts: state.dashboard.charts,
    newAlbums: state.dashboard.newAlbums,
    topKannada: state.dashboard.topKannada,
    hot100: state.dashboard.hot100
});


export default connect(mapStateToProps, {
    fetchTopAlbums,
    fetchNapsterTopTracks,
    fetchNapsterTopArtists,
    fetchJioSavanData,
    fetchKannadaTopSongs,
    fetchBillboardHot100
})(withTheme(MainScreen))

const styles = StyleSheet.create({
    title: {
        paddingTop: 10,
        textAlign: 'center'
    },
    photo: {
        width: null,
        height: null,
        flex: 1,
        borderRadius: 4
    },
    cardWrapper: {
        width: 120,
        alignItems: 'center',
        margin: 4
    },
    cardItem: {
        width: 150,
        height: 150,
        margin: 4,
    },
    napsterCard: {
        width: 120,
        height: 120,
        margin: 4
    },
    saavanCard: {
        width: 150,
        height: 100,
        margin: 4,
    }
});