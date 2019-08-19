
export const fetchTopAlbums = () => dispatch => {
    fetch('http://ws.audioscrobbler.com/2.0/?method=tag.gettopalbums&tag=disco&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_ALBUMS',
          payload: responseJson.albums.album
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchLastFMTopTracks = () => dispatch => {
    fetch('http://ws.audioscrobbler.com/2.0/?method=artist.gettoptracks&artist=cher&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_TRACKS',
          payload: responseJson.toptracks.track
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchNapsterTopTracks = () => dispatch => {
    fetch('https://api.napster.com/v2.1/tracks/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_TRACKS',
          payload: responseJson.tracks
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchLastFMTopArtists = () => dispatch => {
    fetch('http://ws.audioscrobbler.com/2.2/?method=chart.gettopartists&api_key=fe67816d712b419bf98ee9a4c2a1baea&format=json&limit=20')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_ARTISTS',
          payload: responseJson.artists.artist
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchNapsterTopArtists = () => dispatch => {
    fetch('https://api.napster.com/v2.2/artists/top?apikey=ZTk2YjY4MjMtMDAzYy00MTg4LWE2MjYtZDIzNjJmMmM0YTdm')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_ARTISTS',
          payload: responseJson.artists
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchJioSavanData = (type) => dispatch => {
    try {
      fetch('https://www.jiosaavn.com/api.php?__call=content.getHomepageData')
        .then((response) => response.json())
        .then((responseJson) => {
          let response = responseJson._bodyInit.split("-->")[1]
          responseJson = JSON.parse(response.trim())
          if (type === "genres") {
            dispatch({
              type: 'JIO_SAVAN_GENRES',
              payload: responseJson.genres
            })
          }
          else if (type === "charts") {
            dispatch({
              type: 'JIO_SAVAN_CHARTS',
              payload: responseJson.charts
            })
          }
          else if (type === "new_albums") {
            dispatch({
              type: 'JIO_SAVAN_NEW_ALBUMS',
              payload: responseJson.new_albums
            })
          }
        })
        .catch((error) => {
          console.error(error);
        });
    } catch (error) {
    }
  }
  
  export const fetchKannadaTopSongs = () => dispatch => {
    fetch('http://192.168.0.11:5000/api/songs/top/week')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'TOP_KANNADA',
          payload: responseJson
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  export const fetchBillboardHot100 = () => dispatch => {
    fetch('http://192.168.0.11:5000/api/songs/top/billboard')
      .then((response) => response.json())
      .then((responseJson) => {
        dispatch({
          type: 'HOT_100',
          payload: responseJson.entries
        })
      })
      .catch((error) => {
        console.error(error);
      });
  }
  
  