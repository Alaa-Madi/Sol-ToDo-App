import { Todo } from "../types";
import '../App.css';
import { MdOutlinePushPin } from "react-icons/md";

interface StickyNotesProps {
  todos: Todo[];
}

export const StickyNotes = ({ todos }: StickyNotesProps) => {
  const importantTasks = todos.filter((t) => t.priority === 'important');

  return (
    <div className="sticky-notes-container">
      <h2 className="sticky-notes-header"><MdOutlinePushPin />
        Priority Tasks</h2>

      {importantTasks.length === 0 ? (
        <div className="empty-notes">No important tasks yet</div>
      ) : (
        <div className="notes-grid">
          {importantTasks.map((task) => (
            <div
              key={task.id}
              className={`note ${task.category.toLowerCase().replace(' ', '-')}`}
              style={{ '--hue': Math.floor(Math.random() * 60) + 10 } as React.CSSProperties}
            >
              <div className="note-header">
                <h4 className="note-title">{task.title}</h4>
                <div className="note-category">{task.category}</div>
              </div>
              <p className="note-content">{task.description}</p>
              <div className="note-footer">
                <span className="note-status">{task.status}</span>
                <div className="note-priority">❗</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};