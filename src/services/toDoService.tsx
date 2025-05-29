import { todoStorage } from "../data/localStorage.ts";

export const todoService = {
  getTodos: () => todoStorage.fetch(),
  addTodo: (todo) => {
    const todos = todoStorage.fetch();
    todos.push(todo);
    todoStorage.save(todos);
  },
};
