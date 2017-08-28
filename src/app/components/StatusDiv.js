import React, { PropTypes } from 'react'
 
const StatusDiv = (props) => {
  const {headerText, subHeadText} = props
  return(
    <div className='abs detailed'>
      <div className='heading'>{headerText}</div>
      <div>{subHeadText}</div>
    </div>
  )
}

StatusDiv.propTypes = {
   headerText: PropTypes.string,
   subHeadText: PropTypes.string
};

export default StatusDiv