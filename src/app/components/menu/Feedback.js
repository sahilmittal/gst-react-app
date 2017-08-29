import React, { PropTypes } from 'react'

export default class Feedback extends React.Component {

  state = {
    status: '',
    email: '',
    message: ''
  }

  handleSubmit = () => {

  }

  render () {
    // const 
    return(
      <div className='feedback'>
        Feedback
      </div>
    )
  }

}

Feedback.propTypes = {
}