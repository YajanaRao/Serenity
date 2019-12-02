import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ViewProps } from 'react-native';

import {
  addSongToFavorite,
  addAlbumToFavorite,
  removeAlbumFromFavorite,
} from '../actions/playerState';
import {
  isAlbumPresent,
  isArtistPresent,
  isSongPresent,
  addArtist,
  removeArtist,
} from '../actions/realmAction';
import Fav from '../components/Fav';
import Follow from '../components/Follow';

interface Props {
  type: string;
  style?: ViewProps;
}

function FavContainer({ type = 'song', style }: Props) {
  const [liked, setLiked] = useState(false);
  const active = useSelector((state: any) => state.playerState.active);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'album') {
      if (isAlbumPresent(active.id)) {
        setLiked(true);
      }
    } else if (type === 'artist') {
      if (isArtistPresent(active.id)) {
        setLiked(true);
      }
    } else if (isSongPresent(active.id)) {
      setLiked(true);
    }
  }, []);

  function addArtistToFavorite() {
    addArtist(active);
    setLiked(true);
  }

  function removeArtistFromFav() {
    removeArtist(active.id);
    setLiked(false);
  }

  function addToFavorite() {
    if (type === 'song') {
      dispatch(addSongToFavorite(active));
    } else if (type === 'album') {
      dispatch(addAlbumToFavorite(active));
    }

    setLiked(true);
  }

  function removeFromFavorite() {
    if (type === 'album') {
      dispatch(removeAlbumFromFavorite(active));
    }
    setLiked(false);
  }

  if (type === 'artist') {
    return (
      <Follow
        liked={liked}
        style={style}
        addToFavorite={addArtistToFavorite}
        removeFromFavorite={removeArtistFromFav}
      />
    );
  }
  return (
    <Fav
      liked={liked}
      style={style}
      addToFavorite={addToFavorite}
      removeFromFavorite={removeFromFavorite}
    />
  );
}

export default FavContainer;
