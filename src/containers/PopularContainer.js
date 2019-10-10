import React from 'react';
import {withNavigation} from 'react-navigation';
import AlbumScrollView from '../components/AlbumScrollView';
import PropTypes from 'prop-types';

class PopularContainer extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {isLoading: true, data: []};
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
      <AlbumScrollView
        title={'Popular Albums'}
        data={this.state.data}
        navigateToSongs={this.navigateToSongs}
      />
    );
  }
}

PopularContainer.propTypes = {
  navigation: PropTypes.object.isRequired
}

export default withNavigation(PopularContainer);
