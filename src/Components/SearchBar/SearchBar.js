import React from 'react';
import { BaseComponent } from '../BaseComponent/BaseComponent';
import './SearchBar.css';

class SearchBar extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = { searchTerm: "" };
        this._bind('search', 'handleTermChange', 'handleKeyUp', 'handleClick');
    }

    search() {
        this.props.onSearch(this.state.searchTerm);
    }

    handleClick(e) {
        e.target.setSelectionRange(0, e.target.value.length);
      }

    handleKeyUp(e) {
        if (e.keyCode === 13) this.search();
    }

    handleTermChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input 
                    id="search-input" 
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange}
                    onKeyUp={this.handleKeyUp} 
                    onClick={this.handleClick}
                />
                <button onClick={this.search} className="SearchButton">
                    SEARCH
                </button>
            </div>
        );
    }
}

export default SearchBar;