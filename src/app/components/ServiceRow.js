import React, { PropTypes } from 'react'
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
   name: PropTypes.string,
   gst: PropTypes.string,
};

export default ServiceRow