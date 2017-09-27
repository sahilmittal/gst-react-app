import React from 'react'
import PropTypes from 'prop-types'

import MenuOption from './MenuOption'

export default class Menu extends React.Component {

  handleClick = (page) => {
    const {handlePageChange} = this.props
    handlePageChange(page)
  }

  render () {
    const {activePage, searchOption} = this.props
    return (
      <div className='menu'>
        <MenuOption searchOption={searchOption} handleClick={this.handleClick} activePage={activePage} page='goodCategories' ico='local_taxi' title='Browse Goods' /> 
        <MenuOption searchOption={searchOption} handleClick={this.handleClick} activePage={activePage} page='services' ico='restaurant' title='Browse Services' /> 
        <MenuOption searchOption={searchOption} handleClick={this.handleClick} activePage={activePage} page='resources' ico='picture_as_pdf' title='Download Resources' /> 
        <MenuOption searchOption={searchOption} handleClick={this.handleClick} activePage={activePage} page='taxCalculator' ico='attach_money' title='Tax Calculator' /> 
        <MenuOption searchOption={searchOption} handleClick={this.handleClick} activePage={activePage} page='feedback' ico='feedback' title='Feedback' /> 
      </div>
    )
  }

}

Menu.propTypes = {
  activePage: PropTypes.string,
  handlePageChange: PropTypes.func
}