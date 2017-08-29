import React, { PropTypes } from 'react'
import { GST_API_URL } from '../../constants/Endpoints'

const Resources = (props) => {

  const {data} = props

  if (data.status == 'success') {
    return <div className='results'>
      {
        data.resources.map((row, index) => {
          return (
            <div key={row.id} className='link-row'>
              <span className='name'>- {row.name}</span> <a className='download-link' href={GST_API_URL+'/api/v1/resources/'+row.id+'/download'}>Download</a>
            </div>
          )
        })
      }
    </div>
  }
  return <div></div>
}

Resources.propTypes = {

}

export default Resources