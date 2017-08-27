import React, { PropTypes } from 'react'
import { highlighText } from '../lib'

const GoodRow = (props) => {
  const {row, searchText} = props
  let htmlText = highlighText(row.name, searchText)
  return(
    <div>
      <div dangerouslySetInnerHTML={{__html: htmlText}} />
      <div><b>{row.gst}</b></div>
      <div><b>{row.category.name}</b></div>
      <hr/>
    </div>
  )
}

GoodRow.propTypes = {
   name: PropTypes.string,
   gst: PropTypes.string,
   category: PropTypes.object,
};

export default GoodRow