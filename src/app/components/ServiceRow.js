import React from 'react'
import PropTypes from 'prop-types'

import { highlighText } from '../lib'

const ServiceRow = (props) => {
  const {row, searchText} = props
  let htmlText = (searchText) ? highlighText(row.name, searchText) : row.name
  return(
    <div className='row'>
      <div className='gst'>{row.gst}</div>
      <div className='label'>service</div><span dangerouslySetInnerHTML={{__html: htmlText}} />
    </div>
  )
}

ServiceRow.propTypes = {
  row: PropTypes.object,
  searchText: PropTypes.string
}

export default ServiceRow