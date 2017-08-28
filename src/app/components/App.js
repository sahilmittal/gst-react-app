import React from 'react'
import axios from 'axios'
import Header from './Header'
import Search from './Search'
import SearchResults from './SearchResults'
import StatusDiv from './StatusDiv'
import { GST_API_URL } from '../constants/Endpoints'
import { connect } from 'react-redux'

class App extends React.Component {

  state = {
    searchResults: [],
    searchText: '',
    status: ''
  }

  performSearch = (searchParams) => {
    const {searchText, searchOption} = searchParams
    let path = '/api/v1/search'

    this.setState({searchResults: [], status: 'busy'})

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
        this.setState({searchText, searchResults, status: 'success'})
      } else {
        this.setState({searchText, searchResults, status: 'nr'})
      }
    })
    .catch(function (error) {
      this.setState({searchText, searchResults, status: 'error'})
    });
  }

  render () {
    const {searchText, searchResults, status} = this.state
    let resultBox = <div></div>
    if(status == 'busy') {
      resultBox = <StatusDiv headerText='Loading...' subHeadText='' />
    } else if (status == 'nr') {
      resultBox = <StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />
    } else if (status == 'error') {
      resultBox = <StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />
    } else if (status == 'success') {
      resultBox = <SearchResults searchText={searchText} data={searchResults} />
    }
    return (
      <div>
        <Header />
        <Search performSearch={this.performSearch} />
        {resultBox}
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