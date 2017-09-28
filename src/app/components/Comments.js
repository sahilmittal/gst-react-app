import React, { Component } from 'react'
import PropTypes from 'prop-types'


class Comments extends Component {

  initializeComment = () => {
    return {
      id: this.local.id++,
      content: '',
      editMode: true,
      savedOnce: false
    }
  }

  local = {
    id: 1,
    editCommentContent: ''
  }

  state = {
    comments: []
  }

  _handleContentChange = (index, e) => {
    const {comments} = this.state
    this.setState({comments: comments.map((c, i) => {  
      if(i == index) {
        c.content = e.target.value 
      }
      return c
    })}) 
  }

  _newComment = (e) => {
    e.preventDefault()
    const {comments} = this.state
    const newComment = this.initializeComment()
    this.setState({comments: [newComment, ...comments]})
  }

  _submitComment = (index) => {
    const {comments} = this.state
    this.setState({comments: comments.map((c, i) => {  
      if(i == index) {
        c.editMode = false 
        c.savedOnce = true
      }
      return c
    })})
  }

  _cancelAction = (index) => {
    const {comments} = this.state
    let deleteAtIndex = -1
    this.setState({comments: comments.map((c, i) => {  
      if(i == index) {
        if(c.savedOnce){
          c.editMode = false
          c.content = this.local.editCommentContent
        } else {
          deleteAtIndex = index
        }
      }
      return c
    })})
    if(deleteAtIndex > -1){
      this._delete(deleteAtIndex)
    }
  }

  _editComment = (index, e) => {
    e.preventDefault()
    const {comments} = this.state
    this.setState({comments: comments.map((c, i) => {  
      if(i == index) {
        c.editMode = true 
        this.local.editCommentContent = c.content
      } else {
        c.editMode = false 
      }
      return c
    })})
  }

  _delete = (index) => {
    const {comments} = this.state 
    this.setState({comments: comments.filter((c, i) => {  
      return i !== index
    })})
  }

  _deleteComment = (index, e) => {
    e.preventDefault()
    if (confirm("You sure you want to delete this comment?") == true) {
      this._delete(index)
    }
  }

  render () {
    const {comments} = this.state
    return(
      <div className='comments'>
        <div>
          <h1>Comments</h1>
          <a href='' onClick={this._newComment.bind(this)}>+ Add New</a>
        </div>
        <ul>
          {
            comments.map((comment, index) => {
              return (
                <li key={comment.id}>
                  {
                    (!comment.editMode) && (
                      <div>
                        <div>{comment.content}</div>
                        <div className='link-container'>
                          <a href='' onClick={this._editComment.bind(this, index)}>Edit</a>&nbsp;
                          <a href='' onClick={this._deleteComment.bind(this, index)}>Delete</a>
                        </div>
                      </div>) 
                  }
                  {
                    (comment.editMode) && (
                      <div>
                        <textarea value={comment.content} onChange={this._handleContentChange.bind(this, index)}></textarea>
                        <br/><button className={comment.content=='' && 'disabled'} onClick={this._submitComment.bind(this, index)}>Submit</button>
                        <button onClick={this._cancelAction.bind(this, index)}>Cancel</button>
                      </div>) 
                  }
                </li>
              )
            })
          }
        </ul>
        <div>
          {comments.length==0 && <span>No comments yet!</span>}
        </div>
      </div>
    )
  }
}

Comments.propTypes = {
}

export default Comments