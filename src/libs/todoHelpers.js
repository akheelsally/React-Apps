export const addTodo = (todo, list) => {
  return [
    ...list, todo
  ]
}

export const findById = (id, list) => {
  return list.find(item => item.id === parseInt(id))
}

export const updateTodoList = (updatedTodo, list) => {
  var index = list.findIndex(item => item.id === updatedTodo.id)
  return [
    ...list.slice(0, index),
    updatedTodo,
    ...list.slice(index + 1)
  ]
}

export const deleteTask = (id, list) => {
  var index = list.findIndex(item => item.id === id)
  return [
    ...list.slice(0, index),
    ...list.slice(index + 1)
  ]
}

export const partialApply = (func, ...args) => func.bind(null, ...args)
