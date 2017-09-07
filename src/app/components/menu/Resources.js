import React from 'react'
import PropTypes from 'prop-types'

import { gstApiUrl } from '../../constants/Endpoints'

const Resources = (props) => {
  const {data} = props
  return (
    <div>
      {
        (data.status == 'success') && (
          <div className='results'>
            {
              data.resources.map((row, index) => {
                return (
                  <div key={row.id} className='link-row'>
                    <span className='name'>- {row.name}</span> <a className='download-link' href={gstApiUrl+'/api/v1/resources/'+row.id+'/download'}>Download</a>
                  </div>
                )
              })
            }
          </div>
        )     
      }
    </div>
  )
}

Resources.propTypes = {
  data: PropTypes.object
}

export default Resources