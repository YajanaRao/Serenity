import React, { useState, useEffect } from 'react';
import { withNavigation } from 'react-navigation';
import PropTypes from 'prop-types';
import AlbumScrollView from '../components/AlbumScrollView';

function PopularContainer({ navigation }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('https://dl.dropboxusercontent.com/s/nrd1fi5lb3i330i/media.json?dl=0')
      .then(res => res.json())
      .then(res => setData(res));
  });

  function navigateToSongs(album) {
    navigation.navigate('Songs', {
      album,
    });
  }

  return (
    <AlbumScrollView
      title="Popular Albums"
      data={data}
      navigateToSongs={navigateToSongs}
    />
  );
}

PopularContainer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default withNavigation(PopularContainer);
