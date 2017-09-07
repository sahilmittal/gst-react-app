import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import StatusDiv from '../StatusDiv'
import Resources from './Resources'
import { gstApiUrl } from '../../constants/Endpoints'

export default class ResourceLibraries extends React.Component {

  state = {
    data: [],
    status: '',
    libraries: {}
  }

  fetchResourceLibraries = () => {
    const {data} = this.state
    const {scrollToBottom} = this.props

    this.setState({data: [], status: 'busy'})
    axios.get(gstApiUrl + '/api/v1/resource_libraries')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        let resourceLibObj = {}
        data.forEach(function (rl) {
          resourceLibObj[rl.id] = {
            status: '',
            resources: []
          }
        })
        this.setState({data, status: 'success', libraries: resourceLibObj})
        scrollToBottom()
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(error => {
      this.setState({data, status: 'error'})
    })
  }

  fetchResources = (resourceId) => {
    let {libraries} = this.state
    libraries[resourceId] = {
      status: 'busy',
      resources: []
    }
    this.setState({libraries})

    axios.get(gstApiUrl + '/api/v1/resource_libraries/' + resourceId + '/resources')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        libraries[resourceId] = {
          status: 'success',
          resources: data  
        }
        this.setState({libraries})
      } else {
        libraries[resourceId] = {
          status: 'nr',
          resources: []  
        }
        this.setState({libraries})
      }
    })
    .catch(error => {
      libraries[resourceId] = {
        status: 'nr',
        resources: []  
      }
      this.setState({libraries})
    })
  }

  componentWillMount () {
    this.fetchResourceLibraries()
  }

  render() {
    const {data, status, libraries} = this.state
    return(
      <div>
        { // busy
          (status == 'busy') && (<StatusDiv headerText='Loading...' subHeadText='' />)     
        }
        { // nr
          (status == 'nr') && (<StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />)     
        }
        { // error
          (status == 'error') && (<StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />)
        }
        { // success
          (status == 'success') && (
            <div className='results resources'>
              {
                data.map((row, index) => {
                  return (
                    <div key={row.id} className='link-row'>
                      <a className='name' onClick={this.fetchResources.bind(this, row.id)}>{index+1}. {row.name}</a>
                      <Resources data={libraries[row.id]} />
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
}

ResourceLibraries.propTypes = {
  scrollToBottom: PropTypes.func
}