import React from 'react'
import { Link } from 'react-router-dom'
import { partialApply } from '../libs/todoHelpers'
import PropTypes from 'prop-types'

const TodoItem = (props) => {
  var checkboxInput
  const handleTaskStatusChange = (e) => {
    var completed = checkboxInput.checked
    props.updateTask({...props.task, completed})  
  }
  const deleteTask = partialApply(props.deleteTask, props.task.id)  
  return (
    <li className='todo-item'>
      <input
        type='checkbox'
        className='checkbox'
        ref={el => { checkboxInput = el }}
        onChange={handleTaskStatusChange}
        defaultChecked={props.task.completed} 
      />
      <span className='edit'><Link to={`/${props.task.id}/edit`}>&#9998;</Link></span>
      <span className='delete' onClick={deleteTask}>&times;</span>
      <span className='todo-text-outer'>
        <span className='todo-text-inner'>{props.task.title}</span>
      </span>
    </li>
  )
}

TodoItem.propTypes = {
  updateTask: PropTypes.func.isRequired,
  deleteTask: PropTypes.func.isRequired,
  task: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired
  }).isRequired
}

export default TodoItem
