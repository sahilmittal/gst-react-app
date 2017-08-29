import React from 'react'

export default class Search extends React.Component {

  state = {
    searchText: '',
    searchOption: 'default'
  }

  handleSearchTextChange = (e) => this.setState({searchText: e.target.value})

  handleSearchOptionChange = (option) => this.setState({searchOption: option, searchText: ''})

  handleFormSubmit = (e) => {
    e.preventDefault()
    const {performSearch} = this.props
    performSearch(this.state)
  }

   handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.handleFormSubmit(e)
    }
  }

  render () {
    const {searchText, searchOption} = this.state
    const placeholder = (searchOption == 'default') ? 'Eg: vegetables, printer, dry fruits etc.' : 'Eg: gambling, supply of food/drinks etc.' 
    return (
      <div className='search'>
        <div className='search-block'>
          <div className='search-options'>
            <span className={(searchOption == 'default') ? 'active' : ''} onClick={this.handleSearchOptionChange.bind(this, 'default')}>Goods/Services</span>
            <span className={(searchOption == 'codes') ? 'active' : ''} onClick={this.handleSearchOptionChange.bind(this, 'codes')}>HSN/SAC Codes</span>
          </div>
          <input type='text' value={searchText} placeholder={placeholder} onChange={this.handleSearchTextChange} onKeyPress={this.handleKeyPress} />
          <span className='submit-btn' onClick={this.handleFormSubmit}><i className="material-icons">search</i></span>
        </div>
      </div>
    );
  }

}