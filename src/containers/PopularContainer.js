import React from 'react';
import AlbumGallery from '../components/AlbumGallery';
import {withNavigation} from 'react-navigation';

class PopularContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    try {
      fetch(
        'https://dl.dropboxusercontent.com/s/nrd1fi5lb3i330i/media.json?dl=0',
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
      songs: songs,
      img: artwork,
      title: title,
    });
  };

  render() {
    return (
      <AlbumGallery
        title={'Popular Albums'}
        data={this.state.data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

export default withNavigation(PopularContainer);
