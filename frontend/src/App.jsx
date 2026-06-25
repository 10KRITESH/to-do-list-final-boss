import { useState, useEffect } from 'react'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetch('http://localhost:3000/tasks')
      .then(res => res.json())
      .then(data => setTasks(data))
  }, [])

  const addTask = () => {
    if (!title) return
    fetch('http://localhost:3000/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title })
    })
      .then(res => res.json())
      .then(newTask => {
        setTasks([...tasks, newTask])
        setTitle('')
      })
  }

  const toggleTask = (id, done) => {
    fetch(`http://localhost:3000/tasks/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ done: !done })
    })
      .then(res => res.json())
      .then(updated => {
        setTasks(tasks.map(t => t.id === id ? updated : t))
      })
  }

  const deleteTask = (id) => {
    fetch(`http://localhost:3000/tasks/${id}`, { method: 'DELETE' })
      .then(() => {
        setTasks(tasks.filter(t => t.id !== id))
      })
  }

  return (
    <div>
      <h1>Todo List</h1>
      <input
        value={title}
        onChange={e => setTitle(e.target.value)}
        placeholder="Enter task..."
      />
      <button onClick={addTask}>Add</button>
      {tasks.map(task => (
        <div key={task.id}>
          <span style={{ textDecoration: task.done ? 'line-through' : 'none' }}>
            {task.title}
          </span>
          <button onClick={() => toggleTask(task.id, task.done)}>
            {task.done ? 'Undo' : 'Done'}
          </button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </div>
  )
}

export default App