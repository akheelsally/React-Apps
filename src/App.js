import React, { Component } from 'react'
import DetailedView from './components/edit'
import TodoInput from './components/todo-input'
import TodoItemContainer from './components/todo-item-container'
import './App.css'
import { findById, addTodo, updateTodoList, deleteTask } from './libs/todoHelpers'
import MdEmail from 'react-icons/lib/md/email'
import MdPhoneIphone from 'react-icons/lib/md/phone-iphone'
import MdDateRange from 'react-icons/lib/md/date-range'
import MdClose from 'react-icons/lib/md/close'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'

class App extends Component {

    state = {
      tasks: [{title: 'test', id: 123, completed: false, dueDate: '2017-04-08',
                subtasks:[
                  {id: 123, title: 'write test', completed: false},
                  {id: 456, title: 'write more test', completed: false},
                  {id: 789, title: 'this is the new todo', completed: false},
                  {id: 458, title: 'write test', completed: false},
                  {id: 799, title: 'write more test', completed: false},
                  {id: 777, title: 'this is the new todo', completed: false},
                  {id: 555, title: 'write test', completed: false} 
                ]
              }
            ]
    }

  deleteTask = (id) => {
    var tasks = this.state.tasks
    this.setState({tasks: deleteTask(id, tasks)})
  }

  addTask = (newTask) => {
    if (!newTask) { return }
    var tasks = this.state.tasks,
        id = +new Date;   
    this.setState({
      tasks:  addTodo({title: newTask, id, completed: false}, tasks)
    })
  }

  updateTask = (updatedTask) => {
    console.log('taske after comiting')
    console.log(updatedTask)
    var tasks = this.state.tasks
    var updatedTasks = updateTodoList(updatedTask, tasks)
    this.setState({tasks: updatedTasks})
  }

  findTask = (id) => {
    return findById(id, this.state.tasks)
  } 

  render () {
    return (
      <Router>
        <div className='app'>
          <TodoInput
            addTask={this.addTask}
          />
          <TodoItemContainer
            tasks={this.state.tasks}
            deleteTask={this.deleteTask}
            updateTask={this.updateTask}
            isFilter={true}
            listClass={'todo-item-list'}
            containerClass={'todo-item-container' }  
            itemClass={'todo-item'}
          />
          <Route 
            path='/:task/edit' 
            render={(props) => 
              <DetailedView 
                updateTask={this.updateTask}
                addSubTask = {this.addSubTask}
                task={this.findTask(props.match.params.task)}
                {...props}
              />
            }
          />
        </div>       
      </Router>
    )
  }
}

function formatTitle (strings, ...args) {
  var capitalize = (str) => {
    str = str.split(' ')
    return str.map(w => w[0].toUpperCase() + w.slice(1)).join(' ')
  }
  return strings.reduce((a, w, i) => {
    return a + w +  (args[i] ? capitalize(args[i]) : '')
  }, '')
}

export default App

/*
const ListItem = ( props ) => {
  return (
    <li>
      <Link to={`/user/${props.id}`}>
        <div className='list-item'>
          <img src={ props.img } />
          <h3 className='list-item-title'>{ props.title }</h3>
          <div className='list-item-info'>          
            <div className='list-item-holder'>
              <p className='list-item-holder-item'><MdPhoneIphone  size={13} color='#2A333C' />  {props.cell} </p>
              <p className='list-item-holder-item'><MdDateRange size={13} color='#2A333C' />  {props.dob} </p>
              <p className='list-item-holder-item'><MdEmail size={13} color='#2A333C' />   {props.email} </p>
            </div>
          </div>
        </div>
      </Link>
    </li>
  )
}


const User = (props) => {
  const handle = (e) => {
    if (e.target.className === 'user-container') {
      props.history.push('/');
    }
  }
  const id = props.match.params.id;
  const user = props.data.find(user => {
   return user.uid === id
  })
  console.log(user);
  return (
    <div className='user-container' onClick={(e) => handle(e)} >
      <div className='user-model' >
        <span className='close'><Link to='/'><MdClose size={21} /></Link></span>
        <h1>{formatTitle`${user.name.title} ${user.name.first} ${user.name.last}`}</h1>
        <img src={user.picture.large} />
        <div className='details'>
          <p><strong>Gender</strong> : {user.gender}</p>
          <p><strong>General Line</strong> : {user.phone} </p>
          <p><strong>Street</strong> : {user.location.street}</p> 
          <p><strong>City</strong>  : {user.location.city}</p>
          <p><strong>State</strong>  : {user.location.state} </p>
          <p><strong>Nationality</strong>  : {user.nat}</p>
          <p><strong>Joined on</strong> : {user.registered}</p>
        </div>
      </div>
    </div>
  )
}

class List extends Component {
  render () {
    if (this.props.loading) {
      return (
        <div className='container'>
          <div className='info'>
            <h1>Loading users...</h1>
          </div>
          
        </div>
      ) 
    }
    var users = this.props.data
    if (!users) {
      return <p>No users</p>
    }

    if (this.props.filter) {
      let filter = this.props.filter
      users = users.filter(user => user.name.first.startsWith(filter))
    }
    return (
      <ul>
        {users.map(user => {         
          return (
            <ListItem
              key={user.uid}
              id={user.uid}
              img={user.picture.medium}
              title={formatTitle`${user.name.first}  ${user.name.last}`}
              cell={user.cell}
              email={user.email}
              dob={user.dob}              
            />
          )
        })}
      </ul>
    )
  }
}

const Nav = (props) => {
  var input;
  const handleChange = (e) => {
    if (e.which === 13) {
      props.setSerchQuery(input.value)
    }
  }
  return (
    <div className='nav'>
      <h1>Demo</h1>
      <input className='search' type='search' ref={el => { input = el }} onKeyDown={(e) => handleChange(e)} />
    </div>
  )
}

class App extends Component {

  constructor (props) {
    super(props)
    this.state = {
      data: null,
      loading: false,
      searchQuery: ''
    }
    this.setSerchQuery = this.setSerchQuery.bind(this)
  }

  setSerchQuery (query) {
    alert('query ' + query)
    this.setState({searchQuery: query})
  }

  componentDidMount () {
    this.setState({loading: true})
    fetch('https://randomuser.me/api/?results=15')
      .then(res => res.json())
      .then(res => res.results.map(user => {
        const id = +new Date() + user.name.first
        user.uid = id
        return user
      }))
      .then(res => {
        this.setState(
          { data: res,
            loading: false
          })
      })
  }

  render () {
    return (
      <Router>
        <div className='app'>
          <Nav setSerchQuery={this.setSerchQuery} />
          <div className='container'>        
            <Route path='/'
              render={() =>
                <List
                  data={this.state.data}
                  loading={this.state.loading}
                  filter={this.state.searchQuery}
                />} 
            />
            <Route 
              path='/user/:id' 
              render={(props) =>
                <User 
                  data={this.state.data} 
                  {...props}
                />}
            />
          </div>
        </div>
      </Router>
    )
  }
}


*/
