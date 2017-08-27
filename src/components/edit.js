import React, { Component } from 'react'
import TodoItemContainer from './todo-item-container'


class DetailedView extends Component {

    state = {
      subtasks: null,
      toggleSubtask: false,
      editing: false
    }

    componentWillMount() {
      this.setState({subtasks: this.props.task.subtasks || []})
    }

    componentDidUpdate() {
      if (this.state.toggleSubtask) {
        this.subtaskInput.focus()
      }
    }

    addSubTask = (newSubtask) => {
      this.setState({subtasks: [...this.state.subtasks,newSubtask]}) 
    }

    deleteSubTask = (id) => {
      var subtasks = this.state.subtasks
      var index = subtasks.findIndex(item => item.id === id)
      this.setState({subtasks:[...subtasks.slice(0,index),...subtasks.slice(index + 1)]})
    }

    updateSubTask = (updatedSubTask) => {
      var subtasks = this.state.subtasks
      var index = subtasks.findIndex(item => item.id === updatedSubTask.id)
      this.setState({subtasks:[...subtasks.slice(0,index),updatedSubTask,...subtasks.slice(index + 1)]})
    }

    exit = () => {
      this.props.history.push('/');
    }
    
    update = () => {
      var title = this.titleUpdateInput.value.trim();
      var dueDate = this.dueDateInput.value
      var task = this.props.task
      var subtask = this.state.subtasks
      task = {...task, title, dueDate}
      task.subtasks = subtask
      this.props.updateTask(task)
      this.exit()    
    }

    toggleSubtaskEdit = () => {
      var toggleSubtask = !this.state.toggleSubtask
      this.setState({toggleSubtask})
    }
    
    handleSubTaskInput = (e) => {    
    const PRESSED_ENTER_KEY = e.type === 'keydown' && e.which === 13
    const BLUR_OR_ESCAPE_KEY_PRESSED =  e.type === 'blur' || (e.type === 'keydown' && e.which === 27) 

    if (PRESSED_ENTER_KEY) {
        var subtask = this.subtaskInput.value.trim()
        if (!subtask) { return }
         subtask = {
          id: this.props.task.id + (+new Date),
          title: this.subtaskInput.value.trim(),
          completed:false
        }
        this.addSubTask(subtask)       
        this.subtaskInput.value = ''
    }
    if (BLUR_OR_ESCAPE_KEY_PRESSED) { 
         this.setState({toggleSubtask: false}) 
    }    
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
              onClick={this.exit}>&times;
            </span>
            <div className='model-content'>
              <div className='main-task-data'>
                <label className='modal-label' htmlFor='task-edit-input'>Title</label>
                <input
                  id='task-edit-input'
                  className='modal-input'
                  type='text'
                  defaultValue={this.props.task.title} 
                  ref={el => { this.titleUpdateInput = el }}
                />
                <label className='modal-label' htmlFor='dueDate'>Due Date</label>
                <input 
                  id='dueDate'
                  className='modal-input'
                  type='date'
                  defaultValue={this.props.task.dueDate}
                  ref={el => { this.dueDateInput = el }}
                />
              </div>
              <div className='sub-task-data'>
                <label className='modal-label'>
                  Sub Tasks 
                  <span 
                    className='subtask-add-btn' 
                    onClick={this.toggleSubtaskEdit}
                  >
                  {this.state.toggleSubtask ?  '-' : '+'}
                  </span>
                </label>    
                {this.state.toggleSubtask && 
                  <input 
                    type='text' 
                    className='modal-input'
                    placeholder='Enter subtask'
                    onKeyDown={this.handleSubTaskInput} 
                    onBlur={this.handleSubTaskInput}
                    ref={el => { this.subtaskInput = el }}  
                  />
                }          
                <TodoItemContainer
                tasks={this.state.subtasks}
                deleteTask={this.deleteSubTask}
                updateTask={this.updateSubTask}  
              />
            </div>
          </div>
          <div className="btn-group">
                  <span className='btn-modal' onClick={this.update} >Confirm</span>
                  <span className='btn-modal' onClick={this.exit}>Cancel</span>
          </div>   
          </div>
        </div>
      
        )
    }
    

}


export default DetailedView;