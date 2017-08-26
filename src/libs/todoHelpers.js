export const addTodo = (todo, list) => {
  return [
    ...list, todo
  ]
}

export const findById = (id, list) => {
  return list.find(item => item.id === id)
}

export const updateTodo = (updatedTodo, list) => {
  var index = list.findIndex(item => item.id === updatedTodo.id)
  return [
    ...list.slice(0, index),
    updatedTodo,
    ...list.slice(index + 1)
  ]
}
