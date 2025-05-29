import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Todo, TaskStatus, TaskPriority, categories, Category } from '../types.ts';
import '../App.css';
import { todoValidationSchema } from '../utils/validationSchema.tsx';

interface Props {
  onAdd: (todo: Todo) => void;
}

export const TodoForm = ({ onAdd }: Props) => {
  const initialValues = {
    title: '',
    description: '',
    category: '' as Category | '',
    status: 'todo' as TaskStatus | '',
    priority: 'normal' as TaskPriority,
  };

  const handleSubmit = (values: typeof initialValues, { resetForm }: any) => {
    if (!values.status || !values.category) {
      alert('Please select a valid status and category');
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: values.title,
      description: values.description,
      status: values.status as TaskStatus,
      priority: values.priority,
      category: values.category as Category,
    };

    onAdd(newTodo);
    resetForm();
  };

  return (
    <div className="form-card">
      <h2>Add Task</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={todoValidationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="todo-form">
          <div>
            <label>Title</label>
            <Field name="title" placeholder="Enter task title" />
            <ErrorMessage name="title" component="div" className="error" />
          </div>

          <div>
            <label>Description</label>
            <Field name="description" as="textarea" placeholder="Task description" />
            <ErrorMessage name="description" component="div" className="error" />
          </div>

          <div>
            <label>Category</label>
            <Field name="category" as="select">
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Field>
            <ErrorMessage name="category" component="div" className="error" />
          </div>

          <div>
            <label>Priority</label>
            <Field name="priority" as="select">
              <option value="normal">Normal</option>
              <option value="important">Important</option>
            </Field>
          </div>

          <button type="submit">Add Task</button>
        </Form>
      </Formik>
    </div>
  );
};
