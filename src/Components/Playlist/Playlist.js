import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';

class Playlist extends BaseComponent {

    constructor(props) {
        super(props);
        this._bind('handleNameChange', 'handleKeyUp', 'handleClick');
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
