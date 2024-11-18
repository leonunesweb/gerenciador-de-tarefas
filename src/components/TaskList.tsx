import { useState } from 'react'
import { Task } from '../App'
import TaskItem from './TaskItem.tsx'
import TaskForm from './TaskForm.tsx'

interface TaskListProps {
  tasks: Task[]
  addTask: (title: string, description: string) => void
  updateTask: (task: Task) => void
  deleteTask: (id: string) => void
  logout: () => void
}

export default function TaskList({ tasks, addTask, updateTask, deleteTask, logout }: TaskListProps) {
  const [editingTask, setEditingTask] = useState<Task | null>(null)

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Cadastrar tarefa</h1>
        <button
          onClick={logout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
        >
          Logout
        </button>
      </div>
      <TaskForm
        onSubmit={(title, description) => {
          if (editingTask) {
            updateTask({ ...editingTask, title, description })
            setEditingTask(null)
          } else {
            addTask(title, description)
          }
        }}
        initialTask={editingTask}
      />
      <div className="space-y-4 mt-6">
      <h1 className="text-3xl font-bold">Lista de tarefas</h1>
      {tasks.length === 0 ? (
          <p className="text-muted-foreground">Não há tarefas cadastradas, cadastre para exibir!</p>
        ) : (
          tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onEdit={() => setEditingTask(task)}
              onDelete={() => deleteTask(task.id)}
              onStatusChange={(status) => updateTask({ ...task, status })}
            />
          ))
        )}
      </div>
    </div>
  )
}