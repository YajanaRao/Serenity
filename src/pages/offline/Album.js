import { FlatList } from "react-native-gesture-handler";
import * as React from "react";
import {
  withTheme,
  Divider,
  Title,
  List,
  Colors,
  IconButton
} from "react-native-paper";
import { connect } from "react-redux";
import { View, StyleSheet, RefreshControl } from "react-native";
import FastImage from "react-native-fast-image";
import { isEqual, isEmpty } from "lodash";

import { getOfflineAlbums } from "../../actions/mediaStore";

class Album extends React.Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      refreshing: false
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.albums, state.albums)) {
      return {
        albums: props.albums,
        refreshing: false
      };
    }
    return null;
  }

  fetchData = () => {
    this.setState({
      refreshing: true
    });
    this.props.getOfflineAlbums();
  };

  componentDidMount() {
    this.props.getOfflineAlbums();
  }

  render() {
    const { colors } = this.props.theme;

    const { navigate } = this.props.navigation;

    if (!isEmpty(this.state.albums)) {
      return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
          <FlatList
            data={this.state.albums}
            ItemSeparatorComponent={() => <Divider inset={true} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.fetchData()}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.album}
                left={props =>
                  item.cover == "null" ? (
                    <FastImage
                      {...props}
                      source={require("../../assets/note.png")}
                      style={styles.icons}
                    />
                  ) : (
                    <FastImage
                      {...props}
                      source={{ uri: "file://" + item.cover }}
                      style={styles.icons}
                    />
                  )
                }
                description={item.numberOfSongs + " songs"}
                onPress={() => {
                  if (item.cover == "null") {
                    navigate("Filter", {
                      album: item.album,
                      title: item.album
                    });
                  } else {
                    navigate("Filter", {
                      album: item.album,
                      img: "file://" + item.cover,
                      title: item.album
                    });
                  }
                }}
              />
            )}
          />
        </View>
      );
    }
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: background,
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <IconButton icon="sentiment-very-dissatisfied" />
        <Title>No offline songs found..</Title>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  albums: state.mediaStore.albums
});

export default connect(
  mapStateToProps,
  { getOfflineAlbums }
)(withTheme(Album));

const styles = StyleSheet.create({
  icons: {
    width: 50,
    borderRadius: 4,
    backgroundColor: "#d7d1c9"
  }
});
