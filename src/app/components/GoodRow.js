import React, { PropTypes } from 'react'
import { highlighText, isNumber } from '../lib'

const GoodRow = (props) => {
  const {row, searchText, hideCategory} = props
  const htmlText = (searchText) ? highlighText(row.name, searchText) : row.name
  const gst = (isNumber(row.gst)) ? <div>{Number(row.gst)}%</div> : <div>{row.gst}</div>
  const categoryDiv = (hideCategory) ? <div></div> : <div className='category'>{row.category.name}</div>
  const labelDiv = (hideCategory) ? <div></div> : <div className='label'>good</div>
  return(
    <div className='row'>
      <div className='gst'>{gst}</div>
      {categoryDiv}
      <span dangerouslySetInnerHTML={{__html: htmlText}} />
    </div>
  )
}

GoodRow.propTypes = {
   name: PropTypes.string,
   gst: PropTypes.string,
   category: PropTypes.object,
};

export default GoodRow