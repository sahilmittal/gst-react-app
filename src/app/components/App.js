import React from 'react'
import axios from 'axios'
import Header from './Header'
import Search from './Search'
import SearchResults from './SearchResults'
import { GST_API_URL } from '../constants/Endpoints'
import { connect } from 'react-redux'

class App extends React.Component {

  state = {
    searchResults: [],
    searchText: ''
  }

  performSearch = (searchParams) => {
    const {searchText, searchOption} = searchParams
    let path = '/api/v1/search'
    if(searchOption == 'codes'){
      path = '/api/v1/codes'
    }
    axios.get(GST_API_URL + path, {
      params: {
        q: searchText
      }
    })
    .then(response => {
      const searchResults = response.data
      if(searchResults.length > 0) {
        this.setState({searchText, searchResults})
      }
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render () {
    const {searchText, searchResults} = this.state
    return (
      <div>
        <Header />
        <Search performSearch={this.performSearch} />
        <SearchResults searchText={searchText} data={searchResults} />
      </div>
    );
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)