let accessToken;
const clientId = process.env.REACT_APP_API_KEY;
const redirectUri = process.env.REACT_APP_REDIRECT_URL;

const Spotify = {

    getAccessToken() {
        if(accessToken) {
            return accessToken;
        }
        // check for access token match
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
        if (accessTokenMatch && expiresInMatch) {
            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);
            window.setTimeout(() => accessToken = '', expiresIn * 1000);
            window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
            return accessToken;
          } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectUri}`;
            window.location = accessUrl;
          }
    },

    search(searchTerm) {
      const accessToken = Spotify.getAccessToken();
      return fetch('https://api.spotify.com/v1/search?type=track&q=${searchTerm}', 
        {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed!');
        }, networkError => {
          console.log(networkError.message);
        }).then(jsonResponse => {
          if (!jsonResponse.tracks) {
            return [];
          }
          return jsonResponse.tracks.items.map(track => ({id: track.id, name: track.name, artist: track.artists[0].name, album: track.album.name, uri: track.uri}));
        });
    },
  }


export default Spotify;