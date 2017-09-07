import React from 'react'
import PropTypes from 'prop-types'
import axios from 'axios'

import StatusDiv from '../StatusDiv'
import SearchResults from '../SearchResults'
import { gstApiUrl } from '../../constants/Endpoints'

export default class Services extends React.Component {

  state = {
    data: [],
    status: ''
  }

  componentDidMount() {
    this.props.scrollToBottom()
  }

  componentDidUpdate() {
    this.props.scrollToBottom()
  }

  fetchData = () => {
    const {data} = this.state
    
    this.setState({data: [], status: 'busy'})
    axios.get(gstApiUrl + '/api/v1/services')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        this.setState({data, status: 'success'})
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(error => {
      this.setState({data, status: 'error'})
    })
  }

  componentWillMount () {
    this.fetchData()
  }

  render() {
    const {data, status} = this.state
    return (
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
          (status == 'success') && (<SearchResults data={data} />)
        }
      </div>
    )
  }
}

Services.propTypes = {
  scrollToBottom: PropTypes.func
}