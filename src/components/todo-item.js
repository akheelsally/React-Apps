import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'
import { partialApply } from '../libs/todoHelpers'

const TodoItem = (props) => {
  var checkboxInput;
  const handleTaskStatusChange = (e) => {
    var completed = checkboxInput.checked
    props.updateTask({...props.task, completed})  
  }
  const deleteTask = partialApply(props.deleteTask, props.id);
  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        ref={el => { checkboxInput = el }}
        onChange={handleTaskStatusChange}
        defaultChecked={props.checked}
      />
      <span className='edit'><Link to={`/${props.id}/edit`}>&#9998;</Link></span>
      <span className='delete' onClick={deleteTask}>&times;</span>
      <span className='todo-text-outer'>
        <span className='todo-text-inner'>
          {props.task.title}
        </span>
      </span>
    </li>
  )
}

export default TodoItem
