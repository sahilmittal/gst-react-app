import React, { PropTypes } from 'react'
import GoodRow from '../GoodRow'

const Goods = (props) => {

  const {data} = props

  if (data.status == 'success') {
    return <div className='results'>
      {
        data.goods.map((row, index) => {
          return <GoodRow hideCategory={true} searchText='' key={row.name} row={row} />
        })
      }
    </div>
  }
  return <div></div>
}

Goods.propTypes = {

}

export default Goods