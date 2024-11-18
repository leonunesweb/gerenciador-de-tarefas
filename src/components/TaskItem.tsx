import { Task } from '../App'

interface TaskItemProps {
  task: Task
  onEdit: () => void
  onDelete: () => void
  onStatusChange: (status: 'Concluída' | 'Pendente') => void
}

export default function TaskItem({ task, onEdit, onDelete, onStatusChange }: TaskItemProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
      <p className="text-gray-600 mb-4">{task.description}</p>
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={task.status === 'Concluída'}
            onChange={(e) => onStatusChange(e.target.checked ? 'Concluída' : 'Pendente')}
            className="form-checkbox h-5 w-5 text-indigo-600"
          />
          <span>{task.status === 'Concluída' ? 'Concluída' : 'Pendente'}</span>
        </div>
        <div className="space-x-2">
          <button
            onClick={onEdit}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Editar
          </button>
          <button
            onClick={onDelete}
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  )
}