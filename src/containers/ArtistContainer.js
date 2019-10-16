import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ArtistScrollView from '../components/ArtistScrollView';

class ArtistContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, data: [] };
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/ju7jj3uttzw1vow/artist.json?dl=0',
      )
        .then(response => response.json())
        .then(responseJson => {
          this.setState({
            isLoading: false,
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

  navigateToSongs = (songs, artwork, title) => {
    this.props.navigation.navigate('Songs', {
      songs,
      img: artwork,
      title,
    });
  };

  render() {
    return (
      <ArtistScrollView
        title="Popular Artists"
        data={this.state.data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

ArtistContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(ArtistContainer);
