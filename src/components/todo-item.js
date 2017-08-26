import React, { Component } from 'react'
import {
  Link
} from 'react-router-dom'

const TodoItem = (props) => {
  console.log(props)
  var checkboxInput;
  const handleTaskStatusChange = (e) => {
    if (checkboxInput.checked) {
      props.updateTask(props.id, 'completed', true)
    } else {
      props.updateTask(props.id, 'completed', false)
    }
  }
  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        ref={el => { checkboxInput = el }}
        onChange={(e) => handleTaskStatusChange(e)}
        checked={props.checked}
      />
      <span className='edit'><Link to={`/${props.id}/edit`}>&#9998;</Link></span>
      <span className='delete' onClick={() => props.deleteTask(props.id)}>&times;</span>
      <span className='todo-text-outer'>
        <span className='todo-text-inner'>
          {props.title}
        </span>
      </span>
    </li>
  )
}

export default TodoItem
