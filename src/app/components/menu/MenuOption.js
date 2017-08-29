import React, { PropTypes } from 'react'

export default class Menu extends React.Component {

  handleClick = (page) => {
    const {handleClick} = this.props
    handleClick(page)
  }

  render () {
    const {page, ico, title, activePage} = this.props
    return(
      <div className={'menu-option '+ ((activePage == page) ? 'active' : '')} onClick={this.handleClick.bind(this, page)}>
        <div className='icon'><i className="material-icons">{ico}</i></div>
        <div className='text'>{title}</div>
      </div>
    )
  }
}