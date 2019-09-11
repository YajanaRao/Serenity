import React from 'react';
import {withNavigation} from 'react-navigation';
import ArtistScrollView from '../components/ArtistScrollView';

class ArtistContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, data: []};
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
      songs: songs,
      img: artwork,
      title: title,
    });
  };
  render() {
    return (
      <ArtistScrollView
        title={'Popular Artists'}
        data={this.state.data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

export default withNavigation(ArtistContainer);
