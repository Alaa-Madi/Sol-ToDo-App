import { useState } from 'react';
import { Sidebar } from './components/sideBar.tsx';
import { TaskBoard } from './components/taskBoard.tsx';
import { StickyNotes } from './components/stickyNotes.tsx';
import { useLocalStorageTodos } from './hooks/useLocalStorage.ts';
import './App.css';
import { TodoForm } from './components/TodoForm.tsx';
import { AuthProvider, useAuth } from './context/authContext.tsx';
import Login from './components/login.tsx';

const AppContent = () => {
  const { todos, addTodo, updateTodo, deleteTodo } = useLocalStorageTodos();
  const [showForm, setShowForm] = useState(false);
  const { user } = useAuth();

  if (!user) {
    return <Login />;
  }

  return (
    <div className="layout">
      <Sidebar todos={todos} onAddClick={() => setShowForm(true)} />

      <div style={{ flex: 1, padding: '1rem' }}>
        {showForm && (
          <TodoForm
            onAdd={(todo) => {
              addTodo(todo);
              setShowForm(false);
            }}
          />
        )}

        <TaskBoard 
          todos={todos} 
          onUpdateTodo={updateTodo} 
          onDeleteTodo={deleteTodo} 
        />
      </div>

      <div style={{ width: '20%', padding: '1rem' }}>
        <StickyNotes todos={todos} />
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;