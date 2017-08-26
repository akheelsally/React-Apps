import React, { Component } from 'react'

const TodoInput = (props) => {
  var taskInput;
  const submit = (e) => {
    if (e.which === 13 || e.type === 'click') {
      props.addTask(taskInput.value)
      taskInput.value = ''
    }
    
  }
  return (
    <div className='todo-input-section'>
      <input
        className='task-input' 
        type='text'
        placeholder='enter task'
        ref={el => { taskInput = el }}
        onKeyPress={submit}
      />
      <span className='btn' onClick={submit}>&#10004;</span>
    </div>
  )
}

export default TodoInput
