import React from 'react'
import MenuOption from './MenuOption'

export default class Menu extends React.Component {

  handleClick = (page) => {
    const {handlePageChange} = this.props
    handlePageChange(page)
  }

  render () {
    const {activePage} = this.props
    return (
      <div className='menu'>
        <MenuOption handleClick={this.handleClick} activePage={activePage} page='goodCategories' ico='local_taxi' title='Browse Goods' /> 
        <MenuOption handleClick={this.handleClick} activePage={activePage} page='services' ico='restaurant' title='Browse Services' /> 
        <MenuOption handleClick={this.handleClick} activePage={activePage} page='resources' ico='picture_as_pdf' title='Download Resources' /> 
        <MenuOption handleClick={this.handleClick} activePage={activePage} page='taxCalculator' ico='attach_money' title='Tax Calculator' /> 
        <MenuOption handleClick={this.handleClick} activePage={activePage} page='feedback' ico='feedback' title='Feedback' /> 
      </div>
    )
  }

}