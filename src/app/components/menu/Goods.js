import React from 'react'
import PropTypes from 'prop-types'

import GoodRow from '../GoodRow'

const Goods = (props) => {
  const {data} = props
  return (
    <div>
    {
      (data.status == 'success') && (
        <div className='results'>
          {
            data.goods.map((row, index) => {
              return <GoodRow hideCategory={true} searchText='' key={row.name} row={row} />
            })
          }
        </div>
      ) 
    }
    </div>
  )
}

Goods.propTypes = {
  data: PropTypes.object
}

export default Goods