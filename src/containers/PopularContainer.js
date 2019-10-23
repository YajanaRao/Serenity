import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import AlbumScrollView from '../components/AlbumScrollView';

class PopularContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/nrd1fi5lb3i330i/media.json?dl=0',
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
        title="Popular Albums"
        data={data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

PopularContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(PopularContainer);
