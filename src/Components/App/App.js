import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import ConnectBtn from '../ConnectBtn/ConnectBtn';
import Spotify from '../../util/Spotify';
import BlockUI from "../../util/BlockUI/BlockUI";
import Swal from "sweetalert2";
import './App.css';

class App extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            "searchResults": [],
            "playlistName": 'New Playlist',
            "playlistTracks": [],
            "connected": '',
            "profileImage": []
        };
        this._bind('addTrack', 'connect', 'disconnect', 'removeTrack','updatePlaylistName', 'savePlaylist', 'search', 'toggleBlocking');
    }

    componentWillMount() {
        const newAccessToken = window.location.href.match(/access_token=([^&]*)/);
        const newExpiresIn = window.location.href.match(/expires_in=([^&]*)/);
        if (newAccessToken && newExpiresIn) {
            this.connect();
        }
    }

    popupMessage(title, message, icon) {
        Swal.fire(title, message, icon);
    }

    toggleBlocking() {
        this.setState({ blocking: !this.state.blocking });
    }

    addTrack(track) {
        let thisPlaylistTracks = this.state.playlistTracks;
        if (!thisPlaylistTracks.find(element => element.id === track.id)) {
            thisPlaylistTracks.push(track);
            this.setState({playlistTracks: thisPlaylistTracks});
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
        if (thisPlaylistTracks.length && this.state.playlistName) {
            let trackURIArray = thisPlaylistTracks.map(trackIndex => trackIndex.uri);
            Spotify.savePlaylist(this.state.playlistName, trackURIArray).then(() => {
                this.setState({
                    playlistName: 'New Playlist',
                    playlistTracks: []
                });
                document.getElementById('Playlist-name').value = this.state.playlistName;
            });
        }
    }

    async search(searchTerm) {
        if (searchTerm.trim() === "") {
            this.popupMessage("Warning!", "Enter a search term.", "warning");
        } else {
            this.toggleBlocking();
            const response = await Spotify.search(searchTerm);
            this.toggleBlocking();
            if (!response) return;
            else if (response.length === 0)
                this.popupMessage("Error!", `No results found for: ${searchTerm}.`, "error");
            else this.setState({ searchResults: response });
        }
    }

    connect() {
        Spotify.connect().then(response => {
            if (response.id) {
                this.setState({
                    connected: response.display_name,
                    profileImage: response.images[0]
                });
            }
        });
    }

    disconnect() {
        Spotify.disconnect();
        window.location.reload();
    }

    render() {
        return (
            <div>
                <h1>Ja<span className="highlight">mmm</span>ing</h1>
                <div className="App">
                    <ConnectBtn 
                        onConnect={this.connect} 
                        onDisconnect={this.disconnect} 
                        connected={this.state.connected} 
                        imageUrl={this.state.profileImage}
                    />
                    <SearchBar 
                        onSearch={this.search}
                        connected={this.state.connected}
                    />
                    <div className="App-playlist">
                        <SearchResults
                            searchResults={this.state.searchResults} onAdd={this.addTrack}
                        />
                        <Playlist
                            playlistName={this.state.playlistName}
                            playlistTracks={this.state.playlistTracks}
                            onNameChange={this.updatePlaylistName}
                            onRemove={this.removeTrack}
                            onSave={this.savePlaylist}
                        />
                    </div>
                </div>
                <BlockUI blocking={this.state.blocking} />
            </div>
        );
    }
}

export default App;
