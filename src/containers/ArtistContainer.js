import React from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import ArtistScrollView from '../components/ArtistScrollView';

class ArtistContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = { data: [] };
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/ju7jj3uttzw1vow/artist.json?dl=0',
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

  navigateToSongs = artist => {
    const { navigation } = this.props;
    navigation.navigate('Songs', {
      artist: artist,
    });
  };

  render() {
    const { data } = this.state;
    return (
      <ArtistScrollView
        title="Popular Artists"
        data={data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

ArtistContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(ArtistContainer);
