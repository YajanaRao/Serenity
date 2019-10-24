import { FlatList } from 'react-navigation';
import React from 'react';
import { Divider, List, Avatar } from 'react-native-paper';
import { RefreshControl } from 'react-native';
import { isEqual, isEmpty } from 'lodash';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getOfflineArtists } from '../../actions/mediaStore';
import Blank from '../../components/Blank';
import Screen from '../../components/Screen';

class Artist extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      artists: [],
      refreshing: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    if (!isEqual(props.artists, state.artists)) {
      return {
        artists: props.artists,
        refreshing: false,
      };
    }
    return null;
  }

  componentDidMount() {
    const { getOfflineArtists } = this.props;
    getOfflineArtists();
  }

  fetchData = () => {
    const { getOfflineArtists } = this.props;
    this.setState({
      refreshing: true,
    });
    getOfflineArtists();
  };

  static navigationOptions = {
    header: null,
  };

  render() {
    const {
      navigation: { navigate },
    } = this.props;

    const { artists, refreshing } = this.state;

    if (!isEmpty(artists)) {
      return (
        <Screen>
          <FlatList
            data={artists}
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
                title={item.artist}
                description={`${item.numberOfSongs} Songs`}
                left={props => (
                  <Avatar.Text
                    {...props}
                    // style={{backgroundColor: colors.surface}}
                    // icon="person"
                    // size={44}
                    label={item.artist.charAt(0)}
                  />
                )}
                onPress={() =>
                  navigate('ArtistSongs', {
                    artist: item,
                  })
                }
              />
            )}
          />
        </Screen>
      );
    }
    return (
      <Blank text="No offline Artists found.." fetchData={this.fetchData} />
    );
  }
}

const mapStateToProps = state => ({
  artists: state.mediaStore.artists,
});

Artist.propTypes = {
  artists: PropTypes.arrayOf(PropTypes.object).isRequired,
  getOfflineArtists: PropTypes.func.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default connect(
  mapStateToProps,
  { getOfflineArtists },
)(Artist);
