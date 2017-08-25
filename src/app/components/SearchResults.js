import React from 'react'

export default class SearchResults extends React.Component {

  state = {

  }

  render () {
    const {data} = this.props
    console.log(data)
    return (
      <div>
        {
          data.map(row => (
            <div>{row.name}</div>
          ))
        }
      </div>
    );
  }

}