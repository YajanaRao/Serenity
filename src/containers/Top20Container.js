import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import AlbumScrollView from '../components/AlbumScrollView';

class Top20Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    try {
      fetch(
        'https://gist.githubusercontent.com/YajanaRao/afddeb588e2e299de1b0ced2db0f195b/raw/6c1c58dbb766d0a3aa62af4e43a360a283078652/top20.json',
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            data: responseJson,
          });
        })
        .catch(error => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  }

  navigateToSongs = album => {
    const { navigation } = this.props;
    navigation.navigate('Songs', {
      album: album,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <AlbumScrollView
        title="Top 15"
        data={data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}
Top20Container.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(Top20Container);
