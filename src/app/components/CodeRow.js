import React from 'react'
import PropTypes from 'prop-types'

import { highlighText } from '../lib'
 
const CodeRow = (props) => {
  const {row, searchText} = props
  const htmlText = (searchText) ? highlighText(row.name, searchText) : row.name
  const labelText = (row.code_type == 'HSN') ? 'good' : 'service'
  return(
    <div className='row'>
      <div className='code'>{row.code_type}: {row.code}</div>
      <div className='label'>{labelText}</div><span className='name' dangerouslySetInnerHTML={{__html: htmlText}} />
    </div>
  )
}

CodeRow.propTypes = {
  row: PropTypes.object,
  searchText: PropTypes.string
}

export default CodeRow