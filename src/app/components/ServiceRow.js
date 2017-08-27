import React, { PropTypes } from 'react'
import { highlighText } from '../lib'

const ServiceRow = (props) => {
  const {row, searchText} = props
  let htmlText = highlighText(row.name, searchText)
  return(
    <div>
      <div dangerouslySetInnerHTML={{__html: htmlText}} />
      <div><b>{row.gst}</b></div>
      <hr />
    </div>
  )
}

ServiceRow.propTypes = {
   name: PropTypes.string,
   gst: PropTypes.string,
};

export default ServiceRow