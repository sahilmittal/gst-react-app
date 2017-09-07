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
import { gstApiUrl } from '../constants/Endpoints'

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
    axios.get(gstApiUrl + path, {
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

    return (
      <div>
        <Header>GST Search</Header>
        <Search performSearch={this.performSearch} />
        <Menu ref={(el) => { this.messagesEnd = el }} activePage={activePage} handlePageChange={this.handlePageChange} />
        { // search/busy
          (activePage == 'search' && status == 'busy') && (<StatusDiv headerText='Loading...' subHeadText='' />)
        }
        { // search/nr
          (activePage == 'search' && status == 'nr') && (<StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />)
        }
        { // search/error
          (activePage == 'search' && status == 'error') && (<StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />)
        }
        { // search/success
          (activePage == 'search' && status == 'success') && (<SearchResults searchText={searchText} data={data} />)
        }
        { // goodCategories
          (activePage == 'goodCategories') && (<GoodCategories scrollToBottom={this.scrollToBottom} />)
        }
        { // services
          (activePage == 'services') && (<Services scrollToBottom={this.scrollToBottom} />)
        }
        { // resources
          (activePage == 'resources') && (<ResourceLibraries scrollToBottom={this.scrollToBottom} />)
        }
        { // taxCalculator
          (activePage == 'taxCalculator') && (<TaxCalculator />)
        }
        { // feedback
          (activePage == 'feedback') && (<Feedback />)
        }
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(App)