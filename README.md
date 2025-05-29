# 📝 To-Do App

## 🔧 Features

- ✅ Create, update, delete tasks
- 🗂️ Tasks organized by **category** (e.g., Work, Home)
- 📌 Mark tasks as **Important** or **Normal**
- 📦 Store tasks in **localStorage** (persists between sessions)
- 🔍 Search tasks by title
- 📊 Group tasks by **status** (To Do, In Progress, Completed)
- 💡 Sticky notes column for important tasks

---
🛠️ Tech Stack
React – UI library

TypeScript – Static typing

Formik + Yup – Form handling and validation

localStorage – Persistent data storage

CSS Modules 


## 🗂️ Project Structure

```bash
src/
├── components/         # UI Components (TodoForm, TaskBoard, Sidebar)
├── context/            # Context Providers (AuthContext, etc.)
├── data/               # LocalStorage and service logic (todoStorage.ts)
├── hooks/              # Custom hooks (useTodoStorage.ts)
├── types/              # TypeScript types and enums (Todo, Status, etc.)
├── utils/              # Validation and helpers (Yup schemas, etc.)
├── App.tsx             # App root component
├── main.tsx            # Entry point

![image](https://github.com/user-attachments/assets/40b726de-2b46-4b41-8f13-c3e30f5a8333)
