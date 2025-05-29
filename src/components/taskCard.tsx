import React from 'react';
import { Todo, TaskStatus } from '../types';
import '../App.css';

interface TaskCardProps {
  todo: Todo;
  onUpdate: (id: number, updatedTodo: Partial<Todo>) => void;
  onDelete: (id: number) => void;
}

export const TaskCard = ({ todo, onUpdate, onDelete }: TaskCardProps) => {
  const getStatusActions = () => {
    switch (todo.status) {
      case 'todo':
        return { label: 'Start Task', nextStatus: 'in-progress' as TaskStatus };
      case 'in-progress':
        return { label: 'Mark Complete', nextStatus: 'completed' as TaskStatus };
      case 'completed':
        return { label: 'Reopen Task', nextStatus: 'todo' as TaskStatus };
      default:
        return { label: '', nextStatus: null };
    }
  };

  const { label, nextStatus } = getStatusActions();

  return (
    <div className="task-card">
      <div className="task-header">
        <strong>{todo.title}</strong>
        <button 
          onClick={() => onDelete(todo.id)}
          className="delete-btn"
        >
          ×
        </button>
      </div>
      <p className="task-description">{todo.description}</p>
      <div className="task-meta">
        <span className={`priority-tag ${todo.priority}`}>
          {todo.priority}
        </span>
        <span className="category">{todo.category}</span>
      </div>
      {nextStatus && (
        <button
          onClick={() => onUpdate(todo.id, { status: nextStatus })}
          className="status-action-btn"
        >
          {label}
        </button>
      )}
    </div>
  );
};