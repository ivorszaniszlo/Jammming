import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { searchTerm: "" };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleClick = this.handleClick.bind(this);
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