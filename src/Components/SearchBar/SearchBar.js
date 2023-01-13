import React from 'react';
import './SearchBar.css';

class SearchBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "searchTerm": ""
        };
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search() {
        let searchTerm = this.state.term;
        this.props.onSearch(searchTerm);
    }

    handleTermChange(e) {
        this.setState({searchTerm: e.target.value});
    }

    render() {
        return (
            <div className="SearchBar">
                <input onChange={this.handleTermChange} placeholder="Enter A Song, Album, or Artist" />
                <button className="SearchButton">SEARCH</button>
            </div>
        );
    }
}

export default SearchBar;