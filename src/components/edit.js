import React, { Component } from 'react'

const Edit = (props) => {
  var titleUpdateInput;
  const exit = () => {
    props.history.push('/');
  }

  const update = () => {
    var title = titleUpdateInput.value.trim();
    if (!title) { return }
    props.updateTask({...props.task, title})
    exit()

  }

  const handleKeyPress = (e) => {
    if (e.which === 13) { update() }
    if (e.which === 27) { exit() }
  }
  return (
    <div 
      className="fs" 
      onClick={(e) => e.target.className === 'fs' ? exit() : null}
    >
      <div className='modal'>
        <span
          className='close' 
          onClick={exit}>&times;</span>
        <div className='model-content'>
          <label className='modal-label' htmlFor='task-edit-input'>Title</label>
          <input
            id='task-edit-input'
            className='modal-input'
            type='text'
            defaultValue={props.task.title} 
            ref={el => { titleUpdateInput = el }}
            onKeyUp={handleKeyPress}
          />
          <div className="btn-group">
            <span className='btn-modal' onClick={update} >Confirm</span>
            <span className='btn-modal' onClick={exit}>Cancel</span>
          </div>
        </div>
      </div>
    </div>
  )
} // end of Edit

export default Edit;