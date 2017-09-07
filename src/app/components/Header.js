import React from 'react'
import PropTypes from 'prop-types'

const Header = (props) => {
  return (
    <div className='header'>
      {props.children}
    </div>
  )
}

Header.propTypes = {
  children: PropTypes.string
}

export default Header