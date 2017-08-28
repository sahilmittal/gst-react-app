import React, { PropTypes } from 'react'
import { highlighText } from '../lib'
 
const CodeRow = (props) => {
  const {row, searchText} = props
  const htmlText = highlighText(row.name, searchText)
  const labelText = (row.code_type == 'HSN') ? 'good' : 'service'
  return(
    <div className='row'>
      <div className='code'>{row.code_type}: {row.code}</div>
      <div className='label'>{labelText}</div><span className='name' dangerouslySetInnerHTML={{__html: htmlText}} />
    </div>
  )
}

CodeRow.propTypes = {
   name: PropTypes.string,
   code: PropTypes.number,
   code_type: PropTypes.string,
};

export default CodeRow