// src/components/Sidebar.tsx
import React, { useState } from 'react';
import { Todo } from '../types';
import { useAuth } from '../context/authContext.tsx';
import '../App.css';

interface SidebarProps {
  todos: Todo[];
  onAddClick: () => void;
  onCategorySelect?: (category: string) => void;
  selectedCategory?: string | null;
}

export const Sidebar: React.FC<SidebarProps> = ({
  todos,
  onAddClick,
  onCategorySelect,
  selectedCategory
}) => {
  const { user, logout } = useAuth();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const categories = todos.reduce<Record<string, { total: number, completed: number }>>((acc, todo) => {
    if (!acc[todo.category]) {
      acc[todo.category] = { total: 0, completed: 0 };
    }
    acc[todo.category].total += 1;
    if (todo.status === 'completed') {
      acc[todo.category].completed += 1;
    }
    return acc;
  }, {});

  // Get total counts
  const totalTasks = todos.length;
  const completedTasks = todos.filter(todo => todo.status === 'completed').length;

  const handleLogoutClick = () => {
    if (!showLogoutConfirm) {
      setShowLogoutConfirm(true);
      const timer = setTimeout(() => setShowLogoutConfirm(false), 3000);
      return () => clearTimeout(timer);
    } else {
      logout();
      setShowLogoutConfirm(false);
    }
  };

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>To Do App</h2>
        <div className="task-stats">
          <div className="stat-item">
            <span className="stat-number">{totalTasks}</span>
            <span className="stat-label">Total</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{completedTasks}</span>
            <span className="stat-label">Done</span>
          </div>
        </div>
      </div>

      {user && (
        <>
          <button
            className="add-task-btn"
            onClick={onAddClick}
          >
            <span className="plus-icon">+</span>
            New Task
          </button>

          <div className="sidebar-section">
            <h3 className="section-title">
              <span className="icon">📂</span>
              Categories
            </h3>
            <ul className="category-list">
              {Object.entries(categories).map(([category, counts]) => (
                <li
                  key={category}
                  className={`category-item ${selectedCategory === category ? 'active' : ''}`}
                  onClick={() => onCategorySelect?.(category)}
                >
                  <span className="category-name">{category}</span>
                  <span className="category-count">
                    <span className="completed-count">{counts.completed}</span>
                    <span>/</span>
                    <span className="total-count">{counts.total}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

      {user && (
        <div className="sidebar-footer">
          <div
            className={`user-profile ${showLogoutConfirm ? 'confirm' : ''}`}
            onClick={handleLogoutClick}
            title={showLogoutConfirm ? 'Click again to logout' : 'Click to logout'}
          >
            <div className="avatar">
              {user.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <span className="username">{user}</span>
              {showLogoutConfirm && (
                <span className="logout-confirm">Logout?</span>
              )}
            </div>
          </div>
        </div>
      )}

    </div>
  );
};