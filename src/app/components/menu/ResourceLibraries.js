import React, { PropTypes } from 'react'
import axios from 'axios'
import StatusDiv from '../StatusDiv'
import Resources from './Resources'
import { GST_API_URL } from '../../constants/Endpoints'

export default class ResourceLibraries extends React.Component {

  state = {
    data: [],
    status: '',
    libraries: {}
  }

  fetchResourceLibraries = () => {
    const {data} = this.state
    
    this.setState({data: [], status: 'busy'})
    axios.get(GST_API_URL + '/api/v1/resource_libraries')
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
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(function (error) {
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
    axios.get(GST_API_URL + '/api/v1/resource_libraries/' + resourceId + '/resources')
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
    .catch(function (error) {
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
    console.log(libraries)
    if(status == 'busy') {
      return <StatusDiv headerText='Loading...' subHeadText='' />
    } else if (status == 'nr') {
      return <StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />
    } else if (status == 'error') {
      return <StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />
    } else if (status == 'success') {
      return <div className='results resources'>
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
    }
    return <div></div>
  }
}

ResourceLibraries.propTypes = {

}