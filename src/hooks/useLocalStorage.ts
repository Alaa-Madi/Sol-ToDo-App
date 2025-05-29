import { useState, useEffect } from 'react';
import { Todo } from '../types';

const STORAGE_KEY = 'todos';

export const useLocalStorageTodos = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const storedTodos = localStorage.getItem(STORAGE_KEY);
      return storedTodos ? JSON.parse(storedTodos) : [];
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const addTodo = (todo: Todo) => {
    setTodos(prevTodos => [...prevTodos, todo]);
  };

  const updateTodo = (id: number, updatedTodo: Partial<Todo>) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, ...updatedTodo } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
  };
};