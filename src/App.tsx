import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import LoginScreen from './components/Login'
import TaskList from './components/TaskList'

export interface Task {
  id: string
  title: string
  description: string
  status: 'Concluída' | 'Pendente'
}

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [tasks, setTasks] = useState<Task[]>([])

  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated')
    if (storedAuth) {
      setIsAuthenticated(true)
      const storedTasks = localStorage.getItem('tasks')
      if (storedTasks) {
        setTasks(JSON.parse(storedTasks))
      }
    }
  }, [])

  useEffect(() => {
    if (isAuthenticated) {
      localStorage.setItem('tasks', JSON.stringify(tasks))
    }
  }, [tasks, isAuthenticated])

  const login = (username: string, _password: string) => {
    localStorage.setItem('isAuthenticated', 'true')
    localStorage.setItem('username', username)
    setIsAuthenticated(true)
    const storedTasks = localStorage.getItem('tasks')
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks))
    }
  }

  const logout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('username')
    setIsAuthenticated(false)
    setTasks([])
  }

  const addTask = (title: string, description: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      status: 'Pendente',
    }
    setTasks([...tasks, newTask])
  }

  const updateTask = (updatedTask: Task) => {
    setTasks(tasks.map(task => task.id === updatedTask.id ? updatedTask : task))
  }

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          isAuthenticated ? <Navigate to="/" /> : <LoginScreen login={login} />
        } />
        <Route path="/" element={
          isAuthenticated ? (
            <TaskList
              tasks={tasks}
              addTask={addTask}
              updateTask={updateTask}
              deleteTask={deleteTask}
              logout={logout}
            />
          ) : (
            <Navigate to="/login" />
          )
        } />
      </Routes>
    </Router>
  )
}