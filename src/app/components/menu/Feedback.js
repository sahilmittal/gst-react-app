import React from 'react'
import axios from 'axios'

import StatusDiv from '../StatusDiv'
import { gstApiUrl } from '../../constants/Endpoints'

import {
  Modal,
  ModalHeader,
  ModalTitle,
  ModalClose,
  ModalBody,
  ModalFooter
} from 'react-modal-bootstrap'

export default class Feedback extends React.Component {

  state = {
    status: '',
    email: '',
    message: '',
    isOpen: false
  }

  openModal = () => {
    this.setState({isOpen: true})
  }

  hideModal = () => {
    this.setState({isOpen: false})
  }

  handleInputChange = (attr, e) => {
    let state = this.state
    state[attr] = e.target.value
    this.setState(state)
  }

  handleSubmit = () => {
    const {email, message} = this.state
    this.setState({status: 'busy'})
    axios.post(gstApiUrl + '/api/v1/feedbacks', {email, message})
    .then(response => {
      if(response.data.id > 0) {
        this.setState({status: 'success', email: '', message: ''})
      } else {
        this.setState({status: 'error'})
      }
      this.openModal()
    })
    .catch(function (error) {
      this.setState({status: 'error'})
    })
  }

  render () {
    const {status, email, message, isOpen} = this.state
    // return <StatusDiv headerText='Thanks! :)' subHeadText="Your feedback is successfully submit. Thanks for your time." />
    return (
      <div>
        <div className='feedback'>
          <div><input type='text' value={email} placeholder='E-mail' onChange={this.handleInputChange.bind(this, 'email')} /></div>
          <div><textarea onChange={this.handleInputChange.bind(this, 'message')} rows={6} placeholder='Message (Mandatory)' value={message}></textarea></div>
          <div className={'submit-btn ' + ((status=='busy' || message=='') ? 'disabled' : '')} onClick={this.handleSubmit}>Submit</div>
        </div>
        <Modal isOpen={isOpen} onRequestHide={this.hideModal}>
          <ModalHeader>
            <ModalClose onClick={this.hideModal}/>
            <ModalTitle>
              {(status=='error' && <span>Oops!</span>)}
              {(status=='success' && <span>Yay!</span>)}
            </ModalTitle>
          </ModalHeader>
          <ModalBody>
            <p>
              {(status=='error' && <span>Something went wrong!</span>)}
              {(status=='success' && <span>Thanks! :)<br/>Your feedback is successfully submit. Thanks for your time.</span>)}
            </p>
          </ModalBody>
          <ModalFooter>
            <button className='btn btn-default' onClick={this.hideModal}>
              Close
            </button>
          </ModalFooter>
        </Modal>
      </div>
    )
  }

}