import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList';

class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleNameChange(e) {
        this.props.onNameChange(e.target.value);
    }

    handleClick(event) {
        event.target.setSelectionRange(0, event.target.value.length);
    }

    handleKeyUp(event) {
        if (event.key === 'Enter' && event.target.value) {
            this.props.onSave();
        }
    }

    render() {
        return (
            <div className="Playlist">
                <input id="Playlist-name" placeholder="Enter a playlist name" defaultValue={this.props.playlistName} onChange={this.handleNameChange} onKeyUp={this.handleKeyUp} onClick={this.handleClick}/>
                <TrackList tracks={this.props.playlistTracks} onRemove={this.props.onRemove} isRemoval={true} />
                <a className="Playlist-save" onClick={this.props.onSave} >SAVE TO SPOTIFY</a>
            </div>
        );
    }
}

export default Playlist;
