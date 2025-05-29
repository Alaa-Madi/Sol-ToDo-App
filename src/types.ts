export type TaskStatus = 'todo' | 'in-progress' | 'completed'; // Note: changed to match your types
export type TaskPriority = 'important' | 'normal';
export const categories = ['Work', 'Home', 'Personal', 'Sport', 'Other'] as const;
export type Category = typeof categories[number];

export interface Todo {
  id: number;
  title: string;
  description: string;
  category: Category;
  status: TaskStatus;
  priority: TaskPriority;
}