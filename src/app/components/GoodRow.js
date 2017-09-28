import React from 'react'
import PropTypes from 'prop-types'

import Comments from './Comments'
import { highlighText, isNumber } from '../lib'

const GoodRow = (props) => {
  const {row, searchText, hideCategory} = props
  const htmlText = (searchText) ? highlighText(row.name, searchText) : row.name
  const gst = (isNumber(row.gst)) ? <div>{Number(row.gst)}%</div> : <div>{row.gst}</div>
  return(
    <div className='row'>
      <div className='gst'>{gst}</div>
      { // category 
        (!hideCategory) && (<div className='category'>{row.category.name}</div>)
      }
      <span dangerouslySetInnerHTML={{__html: htmlText}} />
      <Comments />
    </div>
  )
}

GoodRow.propTypes = {
  row: PropTypes.object,
  searchText: PropTypes.string,
  hideCategory: PropTypes.bool,
}

export default GoodRow