import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ViewStyle } from 'react-native';

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
import { Fav } from '../components/Fav';
import { Follow } from '../components/Follow';
import { AlbumProps, ArtistProps, TrackProps } from '../utils/types';

interface Props {
  type: string;
  style?: ViewStyle;
  item: AlbumProps | ArtistProps | TrackProps;
}

export const FavContainer = ({ type = 'song', style, item }: Props) => {
  const [liked, setLiked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'album' && item) {
      if (isAlbumPresent(item.id)) {
        setLiked(true);
      }
    } else if (type === 'artist' && item) {
      if (isArtistPresent(item.id)) {
        setLiked(true);
      }
    } else if (isSongPresent(item.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [type, item]);

  const addArtistToFavorite = () => {
    addArtist(item);
    setLiked(true);
  };

  const removeArtistFromFav = () => {
    removeArtist(item.id);
    setLiked(false);
  };

  const addToFavorite = () => {
    if (type === 'song') {
      dispatch(addSongToFavorite(item));
    } else if (type === 'album') {
      dispatch(addAlbumToFavorite(item));
    }

    setLiked(true);
  };

  const removeFromFavorite = () => {
    if (type === 'album') {
      dispatch(removeAlbumFromFavorite(item));
    }
    setLiked(false);
  };

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
};
