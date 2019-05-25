import React, { Component } from 'react';
import { IconButton, Divider, Headline, withTheme, Button } from 'react-native-paper';
import { StyleSheet, View, Animated, Platform, FlatList, RefreshControl } from 'react-native';
import Track from './Track';
import { addToQueue } from '../actions';
import { connect } from 'react-redux';

const HEADER_MAX_HEIGHT = 300;
const HEADER_MIN_HEIGHT = 40;
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT;

class Songs extends Component {
    constructor() {
        super();
        // this.AnimatedHeaderValue = new Animated.Value(0);
        this.state = {
            scrollY: new Animated.Value(
                // iOS has negative initial scroll value because content inset...
                Platform.OS === 'ios' ? -HEADER_MAX_HEIGHT : 0,
            ),
            refreshing: false,
        };
    }

    static navigationOptions = {
        header: null
    };

    render() {

        const { navigation, active } = this.props;

        const songs = navigation.getParam('songs', []);
        const albumImage = navigation.getParam('img', 'https://facebook.github.io/react-native/docs/assets/favicon.png');
        const title = navigation.getParam('title', 'No Title');

        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        const scrollY = Animated.add(
            this.state.scrollY,
            Platform.OS === 'ios' ? HEADER_MAX_HEIGHT : 0,
        );


        const headerTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, -HEADER_SCROLL_DISTANCE],
            extrapolate: 'clamp',
        });

        const imageOpacity = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0],
            extrapolate: 'clamp',
        });
        
        const imageTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 100],
            extrapolate: 'clamp',
        });

        const titleScale = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [1, 1, 0.9],
            extrapolate: 'clamp',
        });
        const titleTranslate = scrollY.interpolate({
            inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
            outputRange: [0, 0, -9],
            extrapolate: 'clamp',
        });

       
             // contentContainerStyle={{ paddingTop: Header_Maximum_Height }}
        return (
            <View style={[styles.container, { backgroundColor: background }]}>

                <Animated.ScrollView
                    style={styles.container}
                    scrollEventThrottle={1}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { y: this.state.scrollY } } }],
                        {
                            useNativeDriver: true,
                        }
                    )}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={() => {
                                this.setState({ refreshing: true });
                                setTimeout(() => this.setState({ refreshing: false }), 1000);
                            }}
                            // Android offset for RefreshControl
                            progressViewOffset={HEADER_MAX_HEIGHT}
                        />
                    }
                    // iOS offset for RefreshControl
                    contentInset={{
                        top: HEADER_MAX_HEIGHT,
                    }}
                    contentOffset={{
                        y: -HEADER_MAX_HEIGHT,
                    }}
                >
                   
                    <View style={styles.scrollViewContent}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', flex: 1, margin: 8 }}>
                            <Button icon="get-app" mode="contained" onPress={() => console.log('Pressed')}>
                                Download
                            </Button>
                            <Button icon="play-circle-outline" mode="contained" onPress={() => this.props.addToQueue(songs)}>
                                Play All
                            </Button>
                        </View>
                        <FlatList
                            data={songs}
                            ItemSeparatorComponent={() => <Divider />}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item }) =>
                                <Track track={item} active={active} />
                            }
                        />
                        <View style={{ height: 100 }} />
                    </View>
                
                </Animated.ScrollView>
                <Animated.View
                    pointerEvents="none"
                    style={[
                        styles.header,
                        { 
                            transform: [{ translateY: headerTranslate }],
                            backgroundColor: background
                        },
                    ]}
                >
                    <Animated.Image
                        style={[
                            styles.backgroundImage,
                            {
                                opacity: imageOpacity,
                                transform: [{ translateY: imageTranslate }],
                            },
                        ]}
                        source={{ uri: albumImage }}
                    />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.bar,
                        {
                            backgroundColor: background + '55',
                            transform: [
                                { scale: titleScale },
                                { translateY: titleTranslate },
                            ],
                        },
                    ]}
                >
                    <View style={{ zIndex: 1 }}>
                        <IconButton
                            icon="keyboard-arrow-left"
                            onPress={() => navigation.goBack()}
                            size={30}
                        />
                    </View>
                    <Headline style={styles.title}>{title}</Headline>
                    <View style={{ zIndex: 1 }}>
                        <IconButton
                            icon="play-circle-outline"
                            onPress={() => this.props.addToQueue(songs)}
                        // size={40}

                        />
                    </View>
                </Animated.View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    active: state.media.active,
});

export default connect(mapStateToProps, { addToQueue })(withTheme(Songs));

const styles = StyleSheet.create(
    {
        container: {
            flex: 1
        },
        header: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            overflow: 'hidden',
            height: HEADER_MAX_HEIGHT,
            elevation: 1
        },
        backgroundImage: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            width: null,
            height: HEADER_MAX_HEIGHT,
            resizeMode: 'cover',
        },
        bar: {
            flexDirection: 'row',
            // marginTop: 5,
            // marginBottom: 5,
            alignItems: 'center',
            justifyContent: 'space-between',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            elevation: 1
        },
        scrollViewContent: {
            // iOS uses content inset, which acts like padding.
            paddingTop: Platform.OS !== 'ios' ? HEADER_MAX_HEIGHT : 0,
        },
    });