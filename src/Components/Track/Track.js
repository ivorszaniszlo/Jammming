/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import "boxicons";
import './Track.css';

class Track extends BaseComponent {

    constructor(props) {
        super(props);
        this._bind('addTrack', 'removeTrack');
    }

    renderAction() {
        return (
            <button
                onClick={this.props.isRemoval ? this.removeTrack : this.addTrack}
                className="Track-action"
            >
                {this.props.isRemoval ? (
                    <box-icon
                        color="white"
                        name="minus-circle"
                        animation="flashing-hover"
                    ></box-icon>
                ) : (
                    <box-icon
                        color="white"
                        name="plus-circle"
                        animation="flashing-hover"
                    ></box-icon>
                )}
            </button>
        );
    }

    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    render() {
        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p> {this.props.track.artist} | {this.props.track.album}</p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

Track.defaultProps = {
    onAdd: null,
    onRemove: null,
  };

export default Track;
