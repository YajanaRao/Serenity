import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { withTheme, Divider, Avatar, List } from 'react-native-paper';
import { connect } from 'react-redux';
import FastImage from 'react-native-fast-image';

class Artist extends Component {
    state = {
        files: []
    };
    componentWillReceiveProps(nextProps) {
        if (nextProps.files != this.state.files) {
            this.setState({ files: nextProps.files });
        }
    }

    render() {
        // console.log(this.props.files)
        const { files } = this.props;
        return (
            <View>
                <List.Item
                    title="Justin Beiber"
                    left={props => <Avatar.Icon {...props} icon="add" />}
                />
                <List.Item
                    title="Justin Beiber"
                    left={props => <FastImage {...props} source={{ uri: 'https://dl.dropboxusercontent.com/s/tvzzaeaiq9neuq1/jb.jpg?dl=0' }} style={styles.icons} />}
                />
                <List.Item
                    title="Brodha V"
                    left={props => <FastImage {...props} source={{ uri: 'https://dl.dropboxusercontent.com/s/tvzzaeaiq9neuq1/jb.jpg?dl=0' }} style={styles.icons} />}
                />
            </View>
        );
    }
}
const mapStateToProps = state => ({
    files: state.media.files,
    result: state.media.result
});

export default connect(mapStateToProps)(withTheme(Artist));

const styles = StyleSheet.create({
    icons: {
        width: 60,
        height: 60,
        borderRadius: 30
    }
});