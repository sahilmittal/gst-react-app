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

    

    {
      (data.status == 'busy'  && <div className='row'>Fetching...</div>)
    }
    {
      (data.status == 'nr'    && <div className='row'>No goods were found for this category</div>)
    }
    {
      (data.status == 'error' && <div className='row'>Something went wrong!</div>)
    }
    </div>
  )
}

Goods.propTypes = {
  data: PropTypes.object
}

export default Goods