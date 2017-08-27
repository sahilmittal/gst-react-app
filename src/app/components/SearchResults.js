import React from 'react'
import CodeRow from './CodeRow'
import GoodRow from './GoodRow'
import ServiceRow from './ServiceRow'

export default class SearchResults extends React.Component {

  state = {
  }

  render () {
    const {searchText, data} = this.props
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
    );
  }

}