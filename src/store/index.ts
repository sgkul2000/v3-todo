import { createStore } from 'vuex'
import Todo from '../models/todo'
export default createStore({
  state: {
    // eslint-disable-next-line @typescript-eslint/no-array-constructor
    todos: Array()
  },
  mutations: {
    setTodos (store, payload: Todo[]) {
      store.todos = payload
    },
    appendTodo ({ todos }, payload: Todo) {
      todos.splice(0, 0, payload)
      localStorage.setItem('todos', JSON.stringify(todos))
    },
    toggleDone ({ todos }, index: number) {
      todos[index].done = !todos[index].done
      let temp: Todo
      if (todos[index].done === false) {
        temp = todos[index]
        todos.splice(index, 1)
        todos.splice(0, 0, temp)
      } else {
        temp = todos[index]
        todos.splice(index, 1)
        const newIndex = todos.findIndex((el) => el.done)
        if (newIndex === -1) {
          todos.splice(todos.length, 0, temp)
        } else {
          todos.splice(newIndex, 0, temp)
        }
      }
      localStorage.setItem('todos', JSON.stringify(todos))
    },
    deleteTodo ({ todos }, index: number) {
      todos.splice(index, 1)
      localStorage.setItem('todos', JSON.stringify(todos))
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getTodos: ({ todos }) => todos
  }
})
