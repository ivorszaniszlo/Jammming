import React from 'react';
//import logo from '../../logo.svg';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchResults": [],
            "playlistName": 'New Playlist',
            "playlistTracks": []
        };
        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);
        this.search = this.search.bind(this);
    }

    addTrack(track) {
        let thisPlaylistTracks = this.state.playlistTracks;
        if (!thisPlaylistTracks.find(element => element.id === track.id)) {
            return;
        } else {
            thisPlaylistTracks.push(track);
            this.setState({ playlistTracks: thisPlaylistTracks });
        }
    }

    removeTrack(track) {
        let thisPlaylistTracks = this.state.playlistTracks;
        let newTracks = thisPlaylistTracks.filter(element => element.id !== track.id);
        this.setState({ playlistTracks: newTracks });
    }

    updatePlaylistName(name) {
        this.setState({ playlistName: name });
    }

    savePlaylist() {
        let thisPlaylistTracks = this.state.playlistTracks;
        if(thisPlaylistTracks.length && this.state.playlistName) {
            const trackURIArray = thisPlaylistTracks.map((track) => track.uri);
            Spotify.savePlaylist(this.state.playlistName, trackURIArray).then(() => {
                this.setState({
                  playlistName: 'New Playlist',
                  playlistTracks: []
                });
                document.getElementById('Playlist-name').value = this.state.playlistName;
            });
        }
    }

    search(searchTerm) {
        Spotify.search(searchTerm).then(results => {
            this.setState({searchResults: results});
        });
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <SearchBar onSearch={this.search}/>
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults} onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
