import React, { Component } from 'react'
import SubTaskSection from './sub-task-section'
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

    deleteSubTask = (id) => {
      var subtasks = this.state.subtasks
      var index = subtasks.findIndex(item => item.id === id)
      this.setState({subtasks:[...subtasks.slice(0,index),...subtasks.slice(index + 1)]})
    }

    updateSubTask = () => {
      alert('sub edit')
    }

    exit = () => {
      this.props.history.push('/');
    }
    
    update = () => {
      var title = this.titleUpdateInput.value.trim();
      var dueDate = this.dueDateInput.value
      var task = this.props.task
      var subtask = this.state.subtasks
      task = {...this.props.task, title, dueDate}
      task.subtasks = subtask
      console.log('task before comiting')
      console.log(task)
      this.props.updateTask(task)
      this.exit()    
    }

    toggleSubtaskEdit = () => {
      this.setState({toggleSubtask: true})
    }
    
    handleKeyPress = (e) => {      
     if (e.which === 13) { 
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
      if (e.which === 27) { this.setState({subtasks: false}) }
    }

    addSubTask = (newSubtask) => {
      this.setState({subtasks: [...this.state.subtasks,newSubtask]}) 
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

              <label className='modal-label'>
                Sub Tasks 
                <span 
                  className='subtask-add-btn' 
                  onClick={this.toggleSubtaskEdit}
                >
                  +
                </span>
               </label>    
              {this.state.toggleSubtask && 
                <input 
                  type='text' 
                  onKeyDown={this.handleKeyPress} 
                  ref={el => { this.subtaskInput = el }}  
                />
              }          
              <TodoItemContainer
              tasks={this.state.subtasks}
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