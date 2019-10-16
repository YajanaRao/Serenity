import { FlatList } from 'react-navigation';
import * as React from 'react';
import { withTheme, Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { View, StyleSheet, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { getOfflineAlbums } from '../../actions/mediaStore';
import Blank from '../../components/Blank';

class Album extends React.PureComponent {
  static navigationOptions = {
    header: null,
  };

  constructor(props) {
    super(props);
    this.state = {
      albums: [],
      refreshing: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.albums, state.albums)) {
      return {
        albums: props.albums,
        refreshing: false,
      };
    }
    return null;
  }

  fetchData = () => {
    this.setState({
      refreshing: true,
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
            ItemSeparatorComponent={() => <Divider inset />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.fetchData}
              />
            }
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <List.Item
                title={item.album}
                left={props =>
                  item.cover == null ? (
                    <DefaultImage />
                  ) : (
                    <FastImage
                      {...props}
                      source={{ uri: `file://${item.cover}` }}
                      style={styles.icons}
                    />
                  )
                }
                description={`${item.numberOfSongs} songs`}
                onPress={() => {
                  if (item.cover == 'null') {
                    navigate('Filter', {
                      album: item.album,
                      title: item.album,
                    });
                  } else {
                    navigate('Filter', {
                      album: item.album,
                      img: `file://${item.cover}`,
                      title: item.album,
                    });
                  }
                }}
              />
            )}
          />
        </View>
      );
    }
    return <Blank text="No offline songs found.." fetchData={this.fetchData} />;
  }
}

const mapStateToProps = state => ({
  albums: state.mediaStore.albums,
});

Album.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOfflineAlbums: PropTypes.func.isRequired,
  theme: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { getOfflineAlbums },
)(withTheme(Album));

const styles = StyleSheet.create({
  icons: {
    width: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
