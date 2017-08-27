import React from 'react'

export default class Search extends React.Component {

  state = {
    searchText: 'claves',
    searchOption: 'default'
  }

  handleSearchTextChange = (e) => this.setState({searchText: e.target.value})

  handleSearchOptionChange = (option) => this.setState({searchOption: option})

  handleFormSubmit = (e) => {
    e.preventDefault()
    const {performSearch} = this.props
    performSearch(this.state)
  }

  render () {
    const {searchText, searchOption} = this.state
    return (
      <div>
        <form onSubmit={this.handleFormSubmit}>
          ({searchOption})<br/>
          <span onClick={this.handleSearchOptionChange.bind(this, 'default')}>Goods/Services</span>
          <span onClick={this.handleSearchOptionChange.bind(this, 'codes')}>HSN/SAC Codes</span>
          <input type='text' value={searchText} onChange={this.handleSearchTextChange} />
          <input type='submit' value='Search' />
        </form>
      </div>
    );
  }

}