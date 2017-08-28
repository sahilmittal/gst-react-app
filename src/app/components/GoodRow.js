import React, { PropTypes } from 'react'
import { highlighText, isNumber } from '../lib'

const GoodRow = (props) => {
  const {row, searchText} = props
  const htmlText = highlighText(row.name, searchText)
  const gst = (isNumber(row.gst)) ? <div>{Number(row.gst)}%</div> : <div>{row.gst}</div>
  return(
    <div className='row'>
      <div className='gst'>{gst}</div>
      <div className='category'>{row.category.name}</div>
      <div className='label'>good</div><span dangerouslySetInnerHTML={{__html: htmlText}} />
    </div>
  )
}

GoodRow.propTypes = {
   name: PropTypes.string,
   gst: PropTypes.string,
   category: PropTypes.object,
};

export default GoodRow