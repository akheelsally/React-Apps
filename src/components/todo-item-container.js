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

  rendertaskItems = (arr,itemClass) => {
    arr = this.filterData(arr)
    if (!arr || arr.length === 0 ) {
      return (
        <div className='notification'>
          <div className='notification-content'>
            <h3 className='notification-heading'>
               No {this.getFilterStatus(true)} Tasks available
            </h3>
            <p className='notification-description'>
               Please {this.getFilterStatus()} more tasks
            </p>
          </div>     
        </div>
        
      )
    }
    return arr.map( task => {
      return (
        <TodoItem
          key={task.id}
          deleteTask={this.props.deleteTask}
          updateTask={this.props.updateTask}
          task={task}
          itemClass={itemClass} />
      )
    })
  }

  setFilter = (newFilter) => {
    this.setState({filter: newFilter})
  }

  filterData = (tasks) => {
    const filter = this.state.filter
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
      <div className={this.props.containerClass}>
       {this.props.isFilter && <ToggleBtn labels={['ALL', 'Completed', 'Active']} func={this.setFilter} />} 
        <ul className={this.props.listClass}>
          {this.rendertaskItems(this.props.tasks, this.props.itemClass)}
        </ul>
      </div>
    )
  }
}



export default TodoItemContainer
