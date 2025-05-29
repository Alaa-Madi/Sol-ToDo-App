import React, { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { restrictToVerticalAxis } from '@dnd-kit/modifiers';
import { Todo, TaskStatus } from '../types';
import { TaskCard } from './taskCard.tsx';
import '../App.css';

interface TaskBoardProps {
  todos: Todo[];
  onUpdateTodo: (id: number, updatedTodo: Partial<Todo>) => void;
  onDeleteTodo: (id: number) => void;
}

export const TaskBoard: React.FC<TaskBoardProps> = ({
  todos,
  onUpdateTodo,
  onDeleteTodo
}) => {
  const [search, setSearch] = useState('');
  const statuses: TaskStatus[] = ['todo', 'in-progress', 'completed'];


  const filteredTodos = todos.filter((todo) =>
    todo.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="task-board-container">
      <input
        type="text"
        placeholder="🔍 Search tasks..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-input"
      />

      <DndContext
      >
        <div className="board-columns">
          {statuses.map((status) => {
            const columnTodos = filteredTodos.filter(todo => todo.status === status);

            return (
              <div key={status} className="board-column" data-status={status}>
                <h3>{status.replace('-', ' ').toUpperCase()}</h3>

                <SortableContext
                  items={columnTodos.map(t => t.id)}
                >
                  {columnTodos.length === 0 ? (
                    <div className="empty-state">No tasks here</div>
                  ) : (
                    columnTodos.map((todo) => (
                      <TaskCard
                        key={todo.id}
                        todo={todo}
                        onUpdate={onUpdateTodo}
                        onDelete={onDeleteTodo}
                      />
                    ))
                  )}
                </SortableContext>
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
};