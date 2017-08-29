import React, { PropTypes } from 'react'
import axios from 'axios'
import StatusDiv from '../StatusDiv'
import SearchResults from '../SearchResults'
import { GST_API_URL } from '../../constants/Endpoints'

export default class Services extends React.Component {

  state = {
    data: [],
    status: ''
  }

  fetchData = () => {
    const {data} = this.state
    
    this.setState({data: [], status: 'busy'})
    axios.get(GST_API_URL + '/api/v1/services')
    .then(response => {
      const data = response.data
      if(data.length > 0) {
        this.setState({data, status: 'success'})
      } else {
        this.setState({data, status: 'nr'})
      }
    })
    .catch(function (error) {
      this.setState({data, status: 'error'})
    })
  }

  componentWillMount () {
    this.fetchData()
  }

  render() {
    const {data, status} = this.state
    if(status == 'busy') {
      return <StatusDiv headerText='Loading...' subHeadText='' />
    } else if (status == 'nr') {
      return <StatusDiv headerText='Whoops!' subHeadText="We couldn't find any results." />
    } else if (status == 'error') {
      return <StatusDiv headerText='Something went wrong!' subHeadText="An unexpected error has occurred." />
    } else if (status == 'success') {
      return <SearchResults data={data} />
    }
    return <div></div>
  }
}

Services.propTypes = {

}