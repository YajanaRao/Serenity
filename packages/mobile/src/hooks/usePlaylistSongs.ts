import React, { useEffect, useState } from 'react';
import { mostPlayedSongs } from '../actions/mediaStore';
import { getPlaylist } from '../actions/realmAction';
import realm from '../database';
import { deserializeSongs } from '../utils/database';

export const usePlaylistSongs = (id: string, filter?: string) => {
  const realmSongs = getPlaylist(id);
  const [songs, setSongs] = useState(() => {
    return getSongs(realmSongs.songs, filter);
  });

  function getSongs(songs: [], filter?: string) {
    let allSongs = deserializeSongs(songs);
    if (filter === 'most-played') {
      allSongs = mostPlayedSongs(allSongs);
    }
    return allSongs
  }

  useEffect(() => {
    const listener = (playlist: [], changes: any) => {
      if (changes.changedProperties.length > 0) {
        const song = getSongs(playlist.songs, filter);
        setSongs(song);
      }
    };
    if (realmSongs !== undefined && !realm.isInTransaction) {
      realmSongs.addListener(listener);
      return () => {
        realmSongs.removeListener(listener);
      };
    }
  }, [realmSongs]);


  return songs;
};
