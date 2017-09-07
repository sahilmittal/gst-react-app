import React from 'react'
import PropTypes from 'prop-types'

import CodeRow from './CodeRow'
import GoodRow from './GoodRow'
import ServiceRow from './ServiceRow'

const SearchResults = (props) => {
  const {searchText, data} = props
  return (
    <div className='results'>
      {
        data.map((row) => {
          if(row.code) {
            return <CodeRow searchText={searchText} key={row.name} row={row} />
          } else if(row.category) {
            return <GoodRow searchText={searchText} key={row.name} row={row} />
          } else {
            return <ServiceRow searchText={searchText} key={row.name} row={row} />
          }
        })
      }
    </div>
  )
}

SearchResults.propTypes = {
  row: PropTypes.string,
  data: PropTypes.array,
}

export default SearchResults