import React, { PropTypes } from 'react'
import axios from 'axios'
import StatusDiv from '../StatusDiv'
import { GST_API_URL } from '../../constants/Endpoints'

export default class Feedback extends React.Component {

  state = {
    status: '',
    email: '',
    message: ''
  }

  handleInputChange = (attr, e) => {
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  handleSubmit = () => {
    const {email, message} = this.state
    this.setState({status: 'busy'})
    axios.post(GST_API_URL + '/api/v1/feedbacks', {email, message})
    .then(response => {
      if(response.data.id > 0) {
        this.setState({status: 'success'})
      } else {
        this.setState({status: 'error'})
      }
    })
    .catch(function (error) {
      this.setState({status: 'error'})
    })
  }

  render () {
    const {status, email, message} = this.state
    if(status != 'success'){
      return(
        <div className='feedback'>
          <div><input type='text' value={email} placeholder='E-mail' onChange={this.handleInputChange.bind(this, 'email')} /></div>
          <div><textarea onChange={this.handleInputChange.bind(this, 'message')} rows={6} placeholder='Message (Mandatory)' value={message}></textarea></div>
          <div className={'submit-btn ' + ((status=='busy' || message=='') ? 'disabled' : '')} onClick={this.handleSubmit}>Submit</div>
        </div>
      )
    }
    return <StatusDiv headerText='Thanks! :)' subHeadText="Your feedback is successfully submit. Thanks for your time." />
  }

}

Feedback.propTypes = {
}