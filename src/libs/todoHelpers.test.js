import { 
  addTodo,
  updateTodoList,
  findById,
  deleteTask
} from './todoHelpers'

test('should add a todo to the list', () => {
  const startingTodoList = [
    {id: 123, title: 'write test', completed: false},
    {id: 456, title: 'write more test', completed: false}
  ]

  const newTodo = {id: 789, title: 'this is the new todo', completed: false}

  const expected = [
    {id: 123, title: 'write test', completed: false},
    {id: 456, title: 'write more test', completed: false},
    {id: 789, title: 'this is the new todo', completed: false}
  ]

  const results = addTodo(newTodo, startingTodoList)

  expect(results).toEqual(expected)
})

test('findById should return correct todo item', () => {
  const startingTodoList = [
    {id: 123, title: 'task 1', completed: false},
    {id: 456, title: 'task 2', completed: false}
  ]

  const expected = {id: 123, title: 'task 1', completed: false}  

  const results = findById(123, startingTodoList)

  expect(results).toEqual(expected)
})

test('todoUpdate should should not mutate original list', () => {
  const startingTodoList = [
    {id: 123, title: 'task 1', completed: false},
    {id: 456, title: 'task 2', completed: false}
  ]

  const updatedTodo = {id: 123, title: 'updated task', completed: false}

  const expected = [
    {id: 123, title: 'updated task', completed: false},
    {id: 456, title: 'task 2', completed: false}
  ]

  
  const results = updateTodoList(updatedTodo, startingTodoList)

  expect(results).toEqual(expected)
  expect(results).not.toBe(startingTodoList)
})

test('deleteTask should delete task without  mutate original list', () => {
  const startingTodoList = [
    {id: 123, title: 'task 1', completed: false},
    {id: 456, title: 'task 2', completed: false},
    {id: 789, title: 'task 2', completed: false}
  ]


  const expected = [
    {id: 123, title: 'task 1', completed: false},
    {id: 789, title: 'task 2', completed: false}
  ]

  const results = deleteTask(456, startingTodoList);

  expect(results).toEqual(expected)
})
