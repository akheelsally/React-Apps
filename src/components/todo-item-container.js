import React, { Component } from 'react'
import ToggleBtn from './toggle-btn'
import TodoItem from './todo-item'

class TodoItemContainer extends Component {

    state = {
      filter: ''
    }

  getFilterStatus = (bool) => {
    var word = bool ? 'completed' : 'complete'
    var word2 = bool ? 'Active' : 'add'
    return this.state.filter === 'Completed'? word : word2
  }

  rendertaskItems = (arr) => {
    arr = this.filterData(arr)
    if (arr.length === 0 ) {
      return (
        <div className='error'>
          <div className='error-content'>
            <h3 className='error-heading'>No {this.getFilterStatus(true)} Tasks Remaining</h3>
            <p className='error-description'>Please {this.getFilterStatus()} more tasks </p>
          </div>     
        </div>
        
      )
    }
    return arr.map( task => {
      return (
        <TodoItem
          key={task.id}
          id={task.id}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}
          checked={task.completed}
          task={task} />
      )
    })
  }

  setFilter = (newFilter) => {
    console.log(this.state.filter + 'setting filter to ' + newFilter)
    this.setState({filter: newFilter})
  }

  filterData = (tasks) => {
    const filter = this.state.filter
    console.log('filtering data ' + filter)
    switch (filter) {
      case 'Completed':
        return tasks.filter(task => task.completed === true)
      case 'Active':
        return tasks.filter(task => task.completed === false)
      default:
        return tasks
    }
  }

  render () {
    return (
      <div className='todo-item-container'>
        <ToggleBtn labels={['ALL', 'Completed', 'Active']} func={this.setFilter} />
        <ul className='todo-item-list'>
          {this.rendertaskItems(this.props.tasks)}
        </ul>
      </div>
    )
  }
}

export default TodoItemContainer
