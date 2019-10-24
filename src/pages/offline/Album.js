import { FlatList } from 'react-navigation';
import * as React from 'react';
import { Divider, List } from 'react-native-paper';
import { connect } from 'react-redux';
import { StyleSheet, RefreshControl } from 'react-native';
import FastImage from 'react-native-fast-image';
import { isEqual, isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { getOfflineAlbums } from '../../actions/mediaStore';
import Blank from '../../components/Blank';
import Screen from '../../components/Screen';
import DefaultImage from '../../components/DefaultImage';

class Album extends React.PureComponent {
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

  componentDidMount() {
    const { getOfflineAlbums } = this.props;
    getOfflineAlbums();
  }

  fetchData = () => {
    const { getOfflineAlbums } = this.props;
    this.setState({
      refreshing: true,
    });
    getOfflineAlbums();
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      navigation: { navigate },
    } = this.props;
    const { albums, refreshing } = this.state;

    if (!isEmpty(albums)) {
      return (
        <Screen>
          <FlatList
            data={albums}
            ItemSeparatorComponent={() => <Divider inset />}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
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
                      source={{ uri: item.cover }}
                      style={styles.icons}
                    />
                  )
                }
                description={`${item.numberOfSongs} songs`}
                onPress={() => {
                  navigate('Filter', {
                    album: item,
                  });
                }}
              />
            )}
          />
        </Screen>
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
  navigation: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { getOfflineAlbums },
)(Album);

const styles = StyleSheet.create({
  icons: {
    width: 50,
    borderRadius: 4,
    backgroundColor: '#d7d1c9',
  },
});
