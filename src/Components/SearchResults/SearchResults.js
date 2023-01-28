import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import TrackList from '../TrackList/TrackList';
import './SearchResults.css';

class SearchResults extends BaseComponent {
    render() {
      return (
        <div className="SearchResults">
          <h2>Results</h2>
            <TrackList 
              isRemoval={false}
              onAdd={this.props.onAdd}
              tracks={this.props.searchResults}
            />
        </div>
      );
    }
}

export default SearchResults;
