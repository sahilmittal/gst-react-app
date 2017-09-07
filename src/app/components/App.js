import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { connect } from 'react-redux'

import Header from './Header'
import Menu from './menu/Main'
import Search from './Search'
import SearchResults from './SearchResults'
import GoodCategories from './menu/GoodCategories'
import Services from './menu/Services'
import ResourceLibraries from './menu/ResourceLibraries'
import TaxCalculator from './menu/TaxCalculator'
import Feedback from './menu/Feedback'
import StatusDiv from './StatusDiv'
import { GST_API_URL } from '../constants/Endpoints'

class App extends React.Component {

  state = {
    data: [],
    searchText: '',
    status: '',
    activePage: 'search'
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentDidUpdate() {
    this.scrollToBottom()
  }

  scrollToBottom = () => {
    const node = ReactDOM.findDOMNode(this.messagesEnd)
    node.scrollIntoView({ behavior: "smooth" })
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
    .catch(error => {
      this.setState({searchText, status: 'error'})
    })
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
      resultBox = <GoodCategories scrollToBottom={this.scrollToBottom} />
    } else if(activePage == 'services') {
      resultBox = <Services scrollToBottom={this.scrollToBottom} />
    } else if(activePage == 'resources') {
      resultBox = <ResourceLibraries scrollToBottom={this.scrollToBottom} />
    } else if(activePage == 'taxCalculator') {
      resultBox = <TaxCalculator />
    } else if(activePage == 'feedback') {
      resultBox = <Feedback />
    }
    return (
      <div>
        <Header />
        <Search performSearch={this.performSearch} />
        <div ref={(el) => { this.messagesEnd = el }}></div>
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