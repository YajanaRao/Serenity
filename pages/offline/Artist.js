import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title, List, Avatar } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image';
import _ from 'lodash';

class Artist extends React.Component {
    static navigationOptions = {
        header: null
    }
    
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.files)) {
            this.setState({ files: nextProps.files });
        }
    }

    // componentDidMount() {
    //     console.log("calling get offline media")
    //     this.props.getOfflineMedia()
    // }


    render() {
        const {
            theme: {
                colors: { background },
            },
        } = this.props;

        const { navigate } = this.props.navigation;

        const artists = _.uniqBy(this.state.files, 'artist');

        if (!_.isEmpty(artists)) {
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                    <FlatList
                        // data={_.remove(this.state.files, function(n){
                        //     return n.artist != null
                        // })}
                        data={artists}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        // onRefresh={() => this.props.getOfflineMedia()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <List.Item
                                title={item.artist}
                                left={props => <FastImage {...props} source={{ uri: 'https://source.unsplash.com/collection/574198/120x120' }} style={styles.icons} />}
                                onPress={() => navigate('Songs', { songs: _.filter(this.state.files, function(n){
                                    return n.artist == item.artist
                                }), img: 'https://source.unsplash.com/collection/574198/120x120', title: item.artist })}
                            />
                        }
                    />
                </View>
            );
        }
        return (
            <View style={{ flex: 1, backgroundColor: background, justifyContent: 'center', alignItems: 'center' }}>
                <Title>No offline songs found..</Title>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    files: state.media.files
});


export default connect(mapStateToProps)(withTheme(Artist));
// export default withTheme(Artist);

const styles = StyleSheet.create({
    icons: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});