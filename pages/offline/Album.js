import { FlatList } from 'react-native-gesture-handler';
import * as React from 'react';
import { withTheme, Divider, Button, Title, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import FastImage from 'react-native-fast-image'; 
import _ from 'lodash';

class Album extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (!_.isEmpty(nextProps.files)) {
            console.log("albums", nextProps.files)
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

        const albums = _.uniqBy(this.state.files, 'album');

        if (!_.isEmpty(albums)) {
            return (
                <View style={{ flex: 1, backgroundColor: background }}>
                    <FlatList
                        data={albums}
                        ItemSeparatorComponent={() => <Divider inset={true} />}
                        // onRefresh={() => this.props.getOfflineMedia()}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={({ item }) =>
                            <List.Item
                                title={item.album}
                                left={props => <FastImage {...props} source={{ uri: item.artwork }} style={styles.icons} /> }
                                description={"2 songs"}
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


export default connect(mapStateToProps)(withTheme(Album));
// export default withTheme(Album);

const styles = StyleSheet.create({
    icons: {
        width: 50,
        borderRadius: 4
    },
});