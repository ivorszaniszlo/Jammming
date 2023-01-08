import React from 'react';
import './SearchResults.css';
import TrackList from '../TrackList/TrackList';

class SearchResults extends React.Component {
    render() {
      return (
        <div className="SearchResults">
            <TrackList track={this.props.SearchResults} />
        </div>
      );
    }
}

export default SearchResults;
