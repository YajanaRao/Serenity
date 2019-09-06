import React from 'react';
import {withNavigation} from 'react-navigation';
import AlbumGallery from '../components/AlbumGallery';

class Top20Container extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLoading: true};
  }

  componentDidMount() {
    try {
      fetch('https://api.myjson.com/bins/y857j')
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
        title={'Top 15'}
        data={this.state.data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

export default withNavigation(Top20Container);
