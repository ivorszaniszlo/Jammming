import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import Track from '../Track/Track';
import './TrackList.css';

class TrackList extends BaseComponent {

    render() {
        return (
            <div className="TrackList">
                {this.props.tracks.map(track =>
                    <Track
                        key={track.id}
                        onAdd={this.props.onAdd}
                        onRemove={this.props.onRemove}
                        track={track}
                        isRemoval={this.props.isRemoval}
                    />
                )}
            </div>
        );
    }
}

export default TrackList;
