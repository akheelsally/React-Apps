import React, { Component } from 'react'
import SubTaskSection from './sub-task-section'
import TodoItemContainer from './todo-item-container'


class DetailedView extends Component {

    state = {
      editing: false
    }

    deleteSubTask = () => {
      alert('sub delete')
    }

    updateSubTask = () => {
      alert('sub edit')
    }

    exit = () => {
      this.props.history.push('/');
    }
    
    update = () => {
      var title = this.titleUpdateInput.value.trim();
      if (!title) { return }
      this.props.updateTask({...this.props.task, title})
      this.exit()    
    }
    
    handleKeyPress = (e) => {
      if (e.which === 13) { this.update() }
      if (e.which === 27) { this.exit() }
    }

    render () {
      return (
        <div 
          className="fs" 
          onClick={(e) => e.target.className === 'fs' ? this.exit() : null}
        >
          <div className='modal'>
            <span
              className='close' 
              onClick={this.exit}>&times;</span>
            <div className='model-content'>
              <label className='modal-label' htmlFor='task-edit-input'>Title</label>
              <input
                id='task-edit-input'
                className='modal-input'
                type='text'
                defaultValue={this.props.task.title} 
                ref={el => { this.titleUpdateInput = el }}
                onKeyUp={this.handleKeyPress}
              />
              <label className='modal-label' htmlFor='dueDate'>Due Date</label>
              <input 
                id='dueDate'
                className='modal-input'
                type='date'
                defaultValue={this.props.task.dueDate}
              />
              <label className='modal-label'>Sub Tasks <span className='subtask-add-btn'>+</span></label>              
              <TodoItemContainer
              tasks={this.props.task.subtasks}
              deleteTask={this.deleteSubTask}
              updateTask={this.updateSubTask}  
              listClass={'subtask-list'}
              containerClass={'subtask-list-container' }  
              itemClass={'subtask-list-item '}
            />
            
              <div className="btn-group">
                <span className='btn-modal' onClick={this.update} >Confirm</span>
                <span className='btn-modal' onClick={this.exit}>Cancel</span>
              </div>
            </div>
          </div>
        </div>
      
        )
    }
    

}


export default DetailedView;