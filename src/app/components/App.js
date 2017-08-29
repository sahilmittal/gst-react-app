import React from 'react'
import axios from 'axios'
import Header from './Header'
import Menu from './menu/Main'
import Search from './Search'
import SearchResults from './SearchResults'
import GoodCategories from './menu/GoodCategories'
import Services from './menu/Services'
import Resources from './menu/Resources'
import TaxCalculator from './menu/TaxCalculator'
import Feedback from './menu/Feedback'
import StatusDiv from './StatusDiv'
import { GST_API_URL } from '../constants/Endpoints'
import { connect } from 'react-redux'

class App extends React.Component {

  state = {
    data: [],
    searchText: '',
    status: '',
    activePage: 'search'
  }

  performSearch = (searchParams) => {
    const {searchText, searchOption} = searchParams
    let path = '/api/v1/search'

    this.setState({data: [], status: 'busy', activePage: 'search'})
    if(searchOption == 'codes'){
      path = '/api/v1/codes'
    }
    axios.get(GST_API_URL + path, {
      params: {
        q: searchText
      }
    })
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        this.setState({searchText, data, status: 'success'})
      } else {
        this.setState({searchText, data, status: 'nr'})
      }
    })
    .catch(function (error) {
      this.setState({searchText, data, status: 'error'})
    });
  }

  handlePageChange = (page) => this.setState({activePage: page})

  render () {

    const {searchText, data, status, activePage} = this.state
    let resultBox = <div></div>

    if(activePage == 'search') {
      if(status == 'busy') {
        resultBox = <StatusDiv headerText='Loading...' subHeadText='' />
      } else if (status == 'nr') {
        resultBox = <StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />
      } else if (status == 'error') {
        resultBox = <StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />
      } else if (status == 'success') {
        resultBox = <SearchResults searchText={searchText} data={data} />
      }
    } else if(activePage == 'goodCategories') {
      resultBox = <GoodCategories data={data} />
    } else if(activePage == 'services') {
      resultBox = <Services data={data} />
    } else if(activePage == 'resources') {
      resultBox = <Resources data={data} />
    } else if(activePage == 'taxCalculator') {
      resultBox = <TaxCalculator />
    } else if(activePage == 'feedback') {
      resultBox = <Feedback />
    }
    return (
      <div>
        <Header />
        <Search performSearch={this.performSearch} />
        <Menu activePage={activePage} handlePageChange={this.handlePageChange} />
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